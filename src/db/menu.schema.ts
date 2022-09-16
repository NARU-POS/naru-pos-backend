import { Schema, model } from "mongoose";
import { IMenu } from "@src/models/db.interface";

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
        },
        photo_url: {
            type: String,
        },
    },
    { collection: "menu" },
);

export const MenuModel = model<IMenu>("Menu", menuSchema);
