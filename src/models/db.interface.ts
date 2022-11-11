import { Types } from "mongoose";

export interface IMenu {
    _id: Types.ObjectId;
    name: string;
    description: string;
    notice: string;
    price: number;
    category: string;
    detailCategory: string;
    spicy: number;
    status: string;
    photo_url: string;
}
