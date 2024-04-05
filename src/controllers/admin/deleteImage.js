import fs from "fs";
import storyModel from "../../models/admin/story.model.js"
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { RESPONSE } from "../../helpers/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const deleteImage = async (req, res) => {
    try {
        const { user: { userId }, body } = req;
        const oldFilePath = path.join(
            __dirname,
            "../../../",
            "public",
            body.img
        );
        fs.unlinkSync(oldFilePath);
        const stories = await storyModel.find({ adminId: userId });

        if (!stories) {
            return RESPONSE.error(res, 2003);
        }

        for (let story of stories) {
            // console.log('story before', story)
            for (let data of story.story) {
                if (data.image === body.img) {
                    data.image = '';
                }
            }
            await story.save();
        }

        return RESPONSE.success(res, 2008);
    } catch (error) {
        return RESPONSE.error(res, 9999, 500, error);
    }
};

export default deleteImage;
