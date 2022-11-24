import { Types } from "mongoose";

export interface IMenu {
    _id?: Types.ObjectId;
    name: string;
    description?: string;
    notice?: string;
    price: number;
    category: MENU_CATEGORY;
    detailCategory: MENU_DETAIL_CATEGORY;
    spicy: number;
    status: MENU_STATUS;
    photo_url?: string;
}

export enum MENU_CATEGORY {
    STAKE = "stake",
    PASTA = "pasta",
    PIZZA = "pizza",
    RISOTTO = "risotto",
    SALAD = "salad",
    COFFEE = "coffee",
    DRINK = "drink",
    BEERANDWINE = "beer & wine",
    TEA = "tea",
}

export enum MENU_DETAIL_CATEGORY {
    UNUSED = "unused",
    TOMATO = "tomato",
    CREAM = "cream",
    ROSE = "rose",
    OIL = "oil",
    ICE = "ice",
    HOT = "hot",
}

export enum MENU_STATUS {
    UNUSED = "unused",
    NEW = "NEW",
    BEST = "BEST",
}
