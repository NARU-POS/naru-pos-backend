import Joi from "joi";
import { MENU_CATEGORY, MENU_DETAIL_CATEGORY, MENU_STATUS } from "@src/interfaces";

export const menuIdSchema = Joi.object({
    menuId: Joi.string().length(24).required(),
});

export const menuCategorySchema = Joi.object({
    mainCategory: Joi.string()
        .valid(...Object.values(MENU_CATEGORY))
        .required(),
    detailCategory: Joi.string()
        .valid(...Object.values(MENU_DETAIL_CATEGORY))
        .required(),
});

export const menuBodySchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    notice: Joi.string(),
    price: Joi.number().required(),
    category: Joi.string()
        .valid(...Object.values(MENU_CATEGORY))
        .required(),
    detailCategory: Joi.string()
        .valid(...Object.values(MENU_DETAIL_CATEGORY))
        .required(),
    spicy: Joi.number().required(),
    status: Joi.string()
        .valid(...Object.values(MENU_STATUS))
        .required(),
    photo_url: Joi.string().min(67),
});

export const menuPutBodySchema = menuBodySchema.keys({
    description: Joi.string().required(),
    notice: Joi.string().required(),
    photo_url: Joi.string().min(67).required(),
});
