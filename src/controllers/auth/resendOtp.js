import config from "../../config/config.js";
import UserModel from "../../models/user/user.model.js";
import { sendMails } from "../../services/index.js";
import { RESPONSE, generateHasedValue, genRandomToken, generateOtp, AccountVerify } from "../../helpers/index.js";

const resendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        const existingUser = await UserModel.findOne({ email });

        if (!existingUser) {
            return RESPONSE.error(res, 1010); // User not found error code
        }

        const genOtp = generateOtp();
        const hashedOtp = generateHasedValue(genOtp, 5);
        const otpToken = genRandomToken();
        const resetTokenExpiry = Date.now() + config.tokenExpiryTime;

        await existingUser.updateOne({
            otp: hashedOtp,
            resetToken: otpToken,
            resetTokenExpiry,
        });

        // Send the email for the verification
        const html = AccountVerify(genOtp);
        sendMails(email, "Verify Your Account", html);

        return RESPONSE.success(res, 1021, { otpToken });
    } catch (error) {
        return RESPONSE.error(res, 9999, 500, error);
    }
};

export default resendOTP;
