import Joi from "joi";

export const signIn = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export const signUp = signIn.append({
    confirmPassword: Joi.ref("password"),
});

export const id = Joi.number().integer().min(1).required();
