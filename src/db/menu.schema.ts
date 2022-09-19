import { Schema, model } from "mongoose";
import { IMenu } from "@src/models/db.interface";
import { MENU_CATEGORY } from "@src/utils/constans";

const menuSchema = new Schema<IMenu>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            required: true,
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
        photo_url: {
            type: String,
            default:
                "https://res.cloudinary.com/dcahduceu/image/upload/v1663314125/naru/preparation.png",
        },
    },
    { collection: "menu" },
);

export const MenuModel = model<IMenu>("Menu", menuSchema);
