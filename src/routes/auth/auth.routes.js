import { Router } from 'express';
const router = Router();

// importing controllers
import { forgotPassword, login, resendOTP, resetPassword, signUp, verifyAccount, verifyOtp } from '../../controllers/index.js'

// defining routes
router.post('/signup', signUp);
router.post('/login', login);

//reset password
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);

//verify account
router.post("/verify-account", verifyAccount);
router.post("/resend-otp", resendOTP);


// exporting router
export default router;
