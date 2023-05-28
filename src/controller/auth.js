import * as services from "../services";

// validate email password
import Joi from "joi";
import { emailValidate, passwordValidate } from "../helpers/joiSchema";
import { badRequest } from "../middleware/handleError";

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { error } = Joi.object({
      email: emailValidate,
      password: passwordValidate,
    }).validate(req.body);
    if (error) return badRequest(error.details[0]?.message, res);
    const response = await services.register({ email, password });
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      err: -1,
      msg: "Internal Server Error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { error } = Joi.object({
      email: emailValidate,
      password: passwordValidate,
    }).validate(req.body);
    if (error) return badRequest(error.details[0]?.message, res);
    const response = await services.login({ email, password });
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      err: -1,
      msg: "Internal Server Error",
    });
  }
};
