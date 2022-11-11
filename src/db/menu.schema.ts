import { Schema, model } from "mongoose";
import { IMenu } from "@src/models/db.interface";
import { MENU_CATEGORY, MENU_DETAIL_CATEGORY, MENU_STATUS } from "@src/utils/constans";

const menuSchema = new Schema<IMenu>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            default: "",
        },
        notice: {
            type: String,
            default: "unused",
        },
        price: {
            type: Number,
            required: true,
            default: 0,
        },
        category: {
            type: String,
            required: true,
            enum: MENU_CATEGORY,
        },
        detailCategory: {
            type: String,
            enum: MENU_DETAIL_CATEGORY,
            default: "unused",
        },
        status: {
            type: String,
            enum: MENU_STATUS,
            default: "unused",
        },
        spicy: {
            type: Number,
            default: 0,
        },
        photo_url: {
            type: String,
            default:
                "https://res.cloudinary.com/dcahduceu/image/upload/v1663314125/naru/preparation.png",
        },
    },
    { collection: "menu" },
);

export const MenuModel = model<IMenu>("Menu", menuSchema);
