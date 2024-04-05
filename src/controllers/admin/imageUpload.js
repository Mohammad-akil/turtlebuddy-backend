import { RESPONSE, uploadImage } from "../../helpers/index.js";

const uploadImages = async (req, res) => {
    try {
        const { body, files } = req;
        let image = null;
        if (typeof files !== "undefined" && files.length > 0) {
            image = uploadImage(files, "story_image", "img");
            body.img = image?.[0] || "";
        }
        return RESPONSE.success(res, 2007, body.img);
    } catch (error) {
        return RESPONSE.error(res, 9999, 500, error);
    }
};

export default uploadImages;
