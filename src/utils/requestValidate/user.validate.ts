import Joi from "joi";

export const userLoginSchema = Joi.object({
    loginId: Joi.string().required(),
    password: Joi.string().required(),
});
