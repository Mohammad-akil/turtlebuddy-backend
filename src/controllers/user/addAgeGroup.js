import Validator from "validatorjs";
import UserModel from "../../models/user/user.model.js";
import { RESPONSE } from "../../helpers/index.js";

const addAgeGroup = async (req, res) => {
    let validation = new Validator(req.body, {
        ageGroup: "required",
    });
    if (validation.fails()) {
        const firstMessage = Object.keys(validation.errors.all())[0];
        return RESPONSE.error(res, validation.errors.first(firstMessage));
    }
    const { user: { userId }, body } = req;
    try {
        const oneUser = await UserModel.findByIdAndUpdate(userId, body, { new: true })
        if (!oneUser) {
            return RESPONSE.error(res, 1018);
        }

        return RESPONSE.success(res, 1022, oneUser);
    } catch (error) {
        return RESPONSE.error(res, 9999, 500, error);
    }
};

export default addAgeGroup;
