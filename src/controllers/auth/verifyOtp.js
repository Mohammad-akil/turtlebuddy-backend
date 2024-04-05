import Validator from "validatorjs";
import UserModel from "../../models/user/user.model.js";
import {
  RESPONSE,
  genRandomToken,
  compareHasedvalue,
} from "../../helpers/index.js";

const verifyOtp = async (req, res) => {
  let validation = new Validator(req.body, {
    otp: "required",
    resetToken: "required",
  });
  if (validation.fails()) {
    const firstMessage = Object.keys(validation.errors.all())[0];
    return RESPONSE.error(res, validation.errors.first(firstMessage));
  }
  try {
    const { otp, resetToken } = req.body;

    const checkOtp = await UserModel.findOne({
      resetToken,
      resetTokenExpiry: { $gt: new Date() },
    });
    if (!checkOtp) {
      return RESPONSE.error(res, 1011);
    }

    const isOtpValid = compareHasedvalue(otp, checkOtp.otp);
    if (!isOtpValid) {
      return RESPONSE.error(res, 1014);
    }

    checkOtp.otp = null;
    checkOtp.resetToken = genRandomToken();
    await checkOtp.save();

    const token = {
      resetPasswordToken: checkOtp.resetToken,
    };

    return RESPONSE.success(res, 1015, token);
  } catch (error) {
    return RESPONSE.error(res, 9999, 500, error);
  }
};

export default verifyOtp;
