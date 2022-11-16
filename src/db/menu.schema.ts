import { Schema, model } from "mongoose";
import { PREPARING_IMG } from "@src/utils/constants";
import { IMenu, MENU_CATEGORY, MENU_DETAIL_CATEGORY, MENU_STATUS } from "@src/models/db.interface";

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
            default: MENU_DETAIL_CATEGORY.UNUSED,
        },
        status: {
            type: String,
            enum: MENU_STATUS,
            default: MENU_STATUS.UNUSED,
        },
        spicy: {
            type: Number,
            default: 0,
        },
        photo_url: {
            type: String,
            default: PREPARING_IMG,
        },
    },
    { collection: "menu" },
);

export const MenuModel = model<IMenu>("Menu", menuSchema);
