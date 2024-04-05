const forgotPasswordHtml = (genOtp) => {
  const resetPasswordOtp = `Your reset password OTP is ${genOtp}`;
  return resetPasswordOtp;
};

const resetPasswordHtml = () => {
  const message = "your password is reset sucessfully";
  return message;
};

const AccountVerify = (genOtp) => {
  return `your verify account OTP is ${genOtp}`
}

export { forgotPasswordHtml, resetPasswordHtml, AccountVerify };
