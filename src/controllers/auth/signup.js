import Validator from "validatorjs";
import config from "../../config/config.js";
import UserModel from "../../models/user/user.model.js";
import UserSessionModel from "../../models/auth/userSession.model.js";
import { sendMails } from "../../services/index.js";
import { RESPONSE, generateHasedValue, genJwtToken, genRandomToken, generateOtp, AccountVerify } from "../../helpers/index.js";

const signUp = async (req, res) => {
  let validation = new Validator(req.body, {
    userName: "required|min:2|max:20",
    email: ["required", "regex:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+$/"],
    password: ["required", "min:8", "max:16"],
    confirmPassword: "required|same:password",
  });
  if (validation.fails()) {
    const firstMessage = Object.keys(validation.errors.all())[0];
    return RESPONSE.error(res, validation.errors.first(firstMessage));
  }
  try {
    const { userName, email, password } = req.body;

    //paswsord
    const AA = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/);
    const BB = new RegExp(/^(?=.*[A-Z]).+$/);
    const CC = new RegExp(/^(?=.*[a-z]).+$/);
    const DD = new RegExp(/^(?=.*\d).+$/);
    const EE = new RegExp(/\*[!@#$%^&*()]/);

    if (!password.match(AA)) {
      if (!password.match(BB)) {
        return RESPONSE.error(res, 1005);
      }
      if (!password.match(CC)) {
        return RESPONSE.error(res, 1006);
      }
      if (!password.match(DD)) {
        return RESPONSE.error(res, 1007);
      }
      if (!password.match(EE)) {
        return RESPONSE.error(res, 1008);
      }
    }

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return RESPONSE.error(res, 1009);
    }

    const hashedPassword = generateHasedValue(password, 10);

    const user = await UserModel.create({
      userName,
      email,
      password: hashedPassword,
    });

    const token = genJwtToken(user._id);
    const tokenExpiry = Date.now() + config.tokenExpiryTime;
    await UserSessionModel.create({
      user_id: user._id,
      token: token,
      tokenExpiry
    });

    const genOtp = generateOtp();
    const hashedOtp = generateHasedValue(genOtp, 5);
    const otpToken = genRandomToken();
    const resetTokenExpiry = Date.now() + config.tokenExpiryTime;

    await user.updateOne({
      otp: hashedOtp,
      resetToken: otpToken,
      resetTokenExpiry,
    });

    // Send the email for the verification
    const html = AccountVerify(genOtp);
    sendMails(email, "Verify Your Account", html);


    return RESPONSE.success(res, 1021, { otpToken, email });
  } catch (error) {
    return RESPONSE.error(res, 9999, 500, error);
  }
};

export default signUp;
