import Joi from "joi";

export const emailValidate = Joi.string()
  .email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  })
  .required();

export const passwordValidate = Joi.string()
  .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
  .required();

export const title = Joi.string().required();

export const price = Joi.number().required();

export const available = Joi.number().required();

export const category_code = Joi.string().uppercase().alphanum().required();

export const description = Joi.string().required();

export const image = Joi.string().required();

export const bookId = Joi.string().required();

export const bookIds = Joi.array().required();

export const filename = Joi.array().required();

export const refreshToken = Joi.string().required();
