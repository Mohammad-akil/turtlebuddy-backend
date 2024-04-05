import UserModel from "../../models/user/user.model.js";
import { RESPONSE } from "../../helpers/index.js";

const getaUser = async (req, res) => {
  const {
    user: { userId },
  } = req;
  try {
    const oneUser = await UserModel.findById(userId).select(
      "-otp -resetTokenExpiry -password -resetToken"
    );
    if (!oneUser) {
      return RESPONSE.error(res, 1018);
    }

    return RESPONSE.success(res, 1012, oneUser);
  } catch (error) {
    return RESPONSE.error(res, 9999, 500, error);
  }
};

export default getaUser;
