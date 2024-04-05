import Validator from "validatorjs";
import config from "../../config/config.js";
import UserModel from "../../models/user/user.model.js";
import { sendMails } from "../../services/index.js";
import {
  RESPONSE,
  generateOtp,
  genRandomToken,
  forgotPasswordHtml,
  generateHasedValue,
} from "../../helpers/index.js";

const forgotPassword = async (req, res, next) => {
  let validation = new Validator(req.body, {
    email: "required",
  });
  if (validation.fails()) {
    const firstMessage = Object.keys(validation.errors.all())[0];
    return RESPONSE.error(res, validation.errors.first(firstMessage));
  }

  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return RESPONSE.error(res, 1003);
    }

    const genOtp = generateOtp();
    const hashedOtp = generateHasedValue(genOtp, 5);
    const resetToken = genRandomToken();
    const resetTokenExpiry = Date.now() + config.tokenExpiryTime; // Token expires in 1 hour

    await user.updateOne({
      otp: hashedOtp,
      resetToken,
      resetTokenExpiry,
    });

    // Send the reset password email
    const html = forgotPasswordHtml(genOtp);
    sendMails(email, "Reset Your Password", html);

    return RESPONSE.success(res, 1013, { resetToken });
  } catch (error) {
    return RESPONSE.error(res, 9999, 500, error);
  }
};

export default forgotPassword;
