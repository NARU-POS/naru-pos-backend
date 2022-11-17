import { PREPARING_IMG } from "@src/utils/constants";
import { IMenu, MENU_CATEGORY, MENU_DETAIL_CATEGORY, MENU_STATUS } from "@src/models/db.interface";

export class Menu implements IMenu {
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

export const tempCategory = {
    mainCategory: "stake",
    detailCategory: "unused",
};

export const tempMenu = new Menu({
    name: "통새우 크림파스타",
    description: "맛있는 크림파스타",
    price: 10000,
    category: MENU_CATEGORY.PASTA,
    detailCategory: MENU_DETAIL_CATEGORY.CREAM,
});

export const tempUpdateMenu = new Menu({
    name: "씨푸드 토마토파스타",
    description: "해산물이 풍부한 토마토 파스타",
    price: 12000,
    category: MENU_CATEGORY.PASTA,
    detailCategory: MENU_DETAIL_CATEGORY.TOMATO,
});

export const exampleCategory = {
    stake: ["unused"],
    pizza: ["unused"],
    salad: ["unused"],
    pasta: ["tomato", "cream", "rose", "oil"],
    risotto: ["unused"],
    coffee: ["ice", "hot"],
    drink: ["unused"],
    "beer & wine": ["unused"],
    tea: ["ice", "hot"],
};
