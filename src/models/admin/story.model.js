import mongoose, { Schema } from "mongoose";
import config from "../../config/config.js";
const getImageUrl = (image) => {
    return image ? `${config.appPath}${image}` : "";
};
const setImageUrl = (value) => {
    if (value.startsWith(config.appPath)) {
        value = value.split(config.appPath)?.[1];
    }
    return value;
};
const storySchema = new mongoose.Schema(
    {
        adminId: {
            type: Schema.Types.ObjectId,
            required: false,
            ref: "User",
        },
        title: {
            type: String,
            required: false,
        },
        ageGroup: {
            type: String,
            enum: ["5-8", "9-13", "14-18", "18+"],
        },
        category: {
            type: String,
            enum: ["verbal", "physical"],
        },
        story: [
            {
                id: {
                    type: Number,
                    required: false,
                },
                text: {
                    type: String,
                    required: false,
                },
                image: {
                    type: String,
                    required: false,
                    get: getImageUrl,
                    set: setImageUrl,
                },
            },
        ],
    },
    {
        timestamps: true,
        toJSON: { getters: true },
        toObject: { getters: true },
    }
);

export default mongoose.model("Story", storySchema);