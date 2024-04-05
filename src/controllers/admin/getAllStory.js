import storyModel from "../../models/admin/story.model.js";
import { RESPONSE } from "../../helpers/index.js";

// const getAllStory = async (req, res) => {
//     try {
//         const story = await storyModel.find().sort({ updatedAt: -1 });
//         if (!story) {
//             return RESPONSE.error(res, 2003);
//         }
//         return RESPONSE.success(res, 2002, story);
//     } catch (error) {
//         return RESPONSE.error(res, 9999, 500, error);
//     }
// };

const getAllStory = async (req, res) => {
    try {
        const { ageGroup, category } = req.query;
        const filter = {};
        if (ageGroup) filter.ageGroup = ageGroup;
        if (category) filter.category = category;

        const story = await storyModel.find(filter).sort({ updatedAt: -1 });
        if (!story) {
            return RESPONSE.error(res, 2003);
        }
        return RESPONSE.success(res, 2002, story);
    } catch (error) {
        return RESPONSE.error(res, 9999, 500, error);
    }
};

export default getAllStory;
