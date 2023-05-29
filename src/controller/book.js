import Joi from "joi";
import * as service from "../services";
import { badRequest, internalServerError } from "../middleware/handleError";
import {
  title,
  image,
  category_code,
  price,
  available,
} from "../helpers/joiSchema";
const cloudinary = require("cloudinary").v2;

export const getBooks = async (req, res) => {
  try {
    const response = await service.getBooks(req.query);
    res.status(200).json(response);
  } catch (error) {
    return internalServerError(res);
  }
};

export const createBook = async (req, res) => {
  try {
    const fileData = req.file;
    const { error } = Joi.object({
      title,
      image,
      category_code,
      price,
      available,
    }).validate({
      ...req.body,
      image: fileData?.path,
    });
    if (error) {
      if (fileData) cloudinary.uploader.destroy(fileData.filename);
      return badRequest(error.details[0].message, res);
    }
    const response = await service.createBook(req.body, fileData);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};
