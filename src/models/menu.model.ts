import { Types } from "mongoose";
import { PREPARING_IMG } from "@src/utils/constants";
import { IMenu, MENU_CATEGORY, MENU_DETAIL_CATEGORY, MENU_STATUS } from "@src/interfaces";

export class Menu implements IMenu {
    readonly _id!: Types.ObjectId;
    name: string;
    description: string;
    notice: string;
    price: number;
    category: MENU_CATEGORY;
    detailCategory: MENU_DETAIL_CATEGORY;
    spicy: number;
    status: MENU_STATUS;
    photo_url: string;

    constructor({
        name,
        description = "",
        notice = "unused",
        price,
        category,
        detailCategory = MENU_DETAIL_CATEGORY.UNUSED,
        spicy = 0,
        status = MENU_STATUS.UNUSED,
        photo_url = PREPARING_IMG,
    }: IMenu) {
        this.name = name;
        this.description = description;
        this.notice = notice;
        this.price = price;
        this.category = category;
        this.detailCategory = detailCategory;
        this.spicy = spicy;
        this.status = status;
        this.photo_url = photo_url;
    }
}
