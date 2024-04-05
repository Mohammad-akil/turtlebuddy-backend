import Validator from "validatorjs";
import storyModel from "../../models/admin/story.model.js";
import { RESPONSE } from "../../helpers/index.js";

const addStory = async (req, res) => {
    let validation = new Validator(req.body, {
        title: "required",
        ageGroup: "required",
        category: "required",
    });
    if (validation.fails()) {
        const firstMessage = Object.keys(validation.errors.all())[0];
        return RESPONSE.error(res, validation.errors.first(firstMessage));
    }
    try {
        const { user: { userId }, body } = req;
        body.adminId = userId;
        const story = await storyModel.create(body);
        return RESPONSE.success(res, 2001, story);
    } catch (error) {
        return RESPONSE.error(res, 9999, 500, error);
    }
};

export default addStory;
