import Validator from "validatorjs";
import UserModel from "../../models/user/user.model.js";
import { RESPONSE, generateHasedValue } from "../../helpers/index.js";

const resetPassword = async (req, res) => {
  let validation = new Validator(req.body, {
    resetToken: "required",
    newPassword: "required",
    confirmPassword: "required",
  });
  if (validation.fails()) {
    const firstMessage = Object.keys(validation.errors.all())[0];
    return RESPONSE.error(res, validation.errors.first(firstMessage));
  }
  try {
    const { resetToken, newPassword, confirmPassword } = req.body;
    const AA = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/);
    const BB = new RegExp(/^(?=.*[A-Z]).+$/);
    const CC = new RegExp(/^(?=.*[a-z]).+$/);
    const DD = new RegExp(/^(?=.*\d).+$/);
    const EE = new RegExp(/\*[!@#$%^&*()]/);

    if (!newPassword.match(AA)) {
      if (!newPassword.match(BB)) {
        return RESPONSE.error(res, 1005);
      }
      if (!newPassword.match(CC)) {
        return RESPONSE.error(res, 1006);
      }
      if (!newPassword.match(DD)) {
        return RESPONSE.error(res, 1007);
      }
      if (!newPassword.match(EE)) {
        return RESPONSE.error(res, 1008);
      }
    }
    if (newPassword !== confirmPassword) {
      return RESPONSE.error(res, 1004);
    }
    const user = await UserModel.findOne({
      resetToken,
      resetTokenExpiry: { $gt: new Date() },
    });

    if (!user) {
      return RESPONSE.error(res, 1011);
    }

    const hashedPassword = generateHasedValue(newPassword, 10);

    user.password = hashedPassword;
    user.otp = null;
    user.resetTokenExpiry = null;
    user.resetToken = null;
    await user.save();
    return RESPONSE.success(res, 1016);
  } catch (error) {
    return RESPONSE.error(res, 9999, 500, error);
  }
};

export default resetPassword;
