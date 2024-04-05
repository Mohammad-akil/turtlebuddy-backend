import storyModel from "../../models/admin/story.model.js";
import { RESPONSE } from "../../helpers/index.js";

const getStoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const story = await storyModel.findById(id);
        if (!story) {
            return RESPONSE.error(res, 2003);
        }
        return RESPONSE.success(res, 2004, story);
    } catch (error) {
        return RESPONSE.error(res, 9999, 500, error);
    }
};

export default getStoryById;