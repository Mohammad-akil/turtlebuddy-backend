import Validator from "validatorjs";
import UserModel from "../../models/user/user.model.js";
import config from "../../config/config.js";
import UserSessionModel from "../../models/auth/userSession.model.js";
import {
  RESPONSE,
  compareHasedvalue,
  genJwtToken,
} from "../../helpers/index.js";

const login = async (req, res) => {
  let validation = new Validator(req.body, {
    email: "required",
    password: "required",
  });
  if (validation.fails()) {
    const firstMessage = Object.keys(validation.errors.all())[0];
    return RESPONSE.error(res, validation.errors.first(firstMessage));
  }
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await UserModel.findOne({ email, isVerify: true });
    if (!user) {
      return RESPONSE.error(res, 1003);
    }
    // Compare the passwords
    const isPasswordValid = compareHasedvalue(password, user.password);

    if (!isPasswordValid) {
      return RESPONSE.error(res, 1017);
    }

    // Only generate token and create session if the password is valid
    const token = genJwtToken(user._id);
    const tokenExpiry = Date.now() + config.tokenExpiryTime;
    await UserSessionModel.create({
      user_id: user._id,
      token: token,
      tokenExpiry
    });

    return RESPONSE.success(res, 1002, {
      id: user._id,
      name: user.userName,
      email: user.email,
      token,
    });
  } catch (error) {
    return RESPONSE.error(res, 9999, 500, error);
  }
};

export default login;
