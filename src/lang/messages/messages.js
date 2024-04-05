const MESSAGES = {
  //auth
  1001: "signup successfully",
  1002: "login successfully",
  1003: "User not found!",
  1004: "new and confirm password does not match",
  1005: "Password must conatin atlist one capital latter",
  1006: "Password must conatin atlist one small latter",
  1007: "Password must conatin atlist one number",
  1008: "Password must conatin atlist one special charater",
  1009: "user already exist",
  1010: "Token Expired",
  1011: "Invaild token",
  1012: "get profile",
  1013: "Reset password email has been successfully sent",
  1014: "Incorrect OTP",
  1015: "Otp verify successfully",
  1016: "Password reset successful",
  1017: "Password does not match",
  1018: "User not found!",
  1019: "token not found!",
  1020: "your account has been verified",
  1021: "mail sent",
  1022: "age added successfully",

  //admin
  2001: "story added!",
  2002: "get All Stories",
  2003: "story not found!",
  2004: "get story",
  2005: "Story deleted successfully",
  2006: "Story updated successfully",
  2007: "image upload successfully",
  2008: "image delete successfully",

  //common
  9999: "Something went wrong!",
};
const getMessage = function (messageCode) {
  if (isNaN(messageCode)) {
    return messageCode;
  }
  return messageCode ? MESSAGES[messageCode] : "";
};

export default getMessage;
