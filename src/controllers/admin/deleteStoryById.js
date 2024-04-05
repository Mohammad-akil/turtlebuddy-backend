import storyModel from "../../models/admin/story.model.js";
import { RESPONSE } from "../../helpers/index.js";

const deleteStoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedStory = await storyModel.findByIdAndDelete(id);
        if (!deletedStory) {
            return RESPONSE.error(res, 2003);
        }
        return RESPONSE.success(res, 2005);
    } catch (error) {
        return RESPONSE.error(res, 9999, 500, error);
    }
};

export default deleteStoryById;