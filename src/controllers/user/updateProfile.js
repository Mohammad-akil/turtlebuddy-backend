import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import config from "../../config/config.js";
import UserModel from "../../models/user/user.model.js";
import { RESPONSE, uploadImage } from "../../helpers/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const updateUserProfile = async (req, res) => {
  const {
    user: { userId },
    body,
    files,
  } = req;

  try {
    let profileImage = null;
    if (typeof files !== "undefined" && files.length > 0) {
      profileImage = uploadImage(files, "profile_image", "picture");
      body.picture = profileImage?.[0] || "";

      const oldUser = await UserModel.findById(userId).select("picture");
      if (oldUser.picture) {
        let oldImage = oldUser.picture?.split(config.appPath)?.[1];
        const oldFilePath = path.join(
          __dirname,
          "../../../",
          "public",
          oldImage
        );
        fs.unlinkSync(oldFilePath);
      }
    }
    const oneUser = await UserModel.findByIdAndUpdate(userId, body, {
      new: true,
    });

    return RESPONSE.success(res, 1012, oneUser);
  } catch (error) {
    return RESPONSE.error(res, 9999, 500, error);
  }
};

export default updateUserProfile;
