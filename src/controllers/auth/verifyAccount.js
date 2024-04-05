import Validator from "validatorjs";
import config from "../../config/config.js";
import UserSessionModel from "../../models/auth/userSession.model.js";
import UserModel from "../../models/user/user.model.js";
import {
    RESPONSE,
    genJwtToken,
    compareHasedvalue,
} from "../../helpers/index.js";

const verifyAccount = async (req, res) => {
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
        checkOtp.isVerify = true;
        checkOtp.otp = null;
        checkOtp.resetToken = null;
        checkOtp.resetTokenExpiry = null;
        await checkOtp.save();

        // token for user
        const token = genJwtToken(checkOtp._id);
        const tokenExpiry = Date.now() + config.tokenExpiryTime;
        await UserSessionModel.create({
            user_id: checkOtp._id,
            token: token,
            tokenExpiry
        });


        return RESPONSE.success(res, 1020, { token });
    } catch (error) {
        return RESPONSE.error(res, 9999, 500, error);
    }
};

export default verifyAccount;
