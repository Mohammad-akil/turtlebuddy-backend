import storyModel from "../../models/admin/story.model.js";
import { RESPONSE } from "../../helpers/index.js";

const updateStoryById = async (req, res) => {
    try {
        const { body, params: { id } } = req;
        const updatedStory = await storyModel.findByIdAndUpdate(id, body, { new: true });
        if (!updatedStory) {
            return RESPONSE.error(res, 2003);
        }

        return RESPONSE.success(res, 2001, updatedStory);
    } catch (error) {
        return RESPONSE.error(res, 9999, 500, error);
    }
};



export default updateStoryById;
