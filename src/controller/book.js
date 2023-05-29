import Joi from "joi";
import * as service from "../services";
import { badRequest, internalServerError } from "../middleware/handleError";
import {
  title,
  image,
  category_code,
  price,
  available,
  bookId,
  bookIds,
  filename,
  description,
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
      description,
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
    return internalServerError(res);
  }
};

export const updateBook = async (req, res) => {
  try {
    const fileData = req.file;
    console.log("body truyen len", req.body);
    const { error } = Joi.object({
      bookId,
    }).validate({ bookId: req.body.bookId });
    if (error) {
      if (fileData) cloudinary.uploader.destroy(fileData.filename);
      return badRequest(error.details[0].message, res);
    }
    const response = await service.updateBook(req.body, fileData);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { error } = Joi.object({
      bookIds,
      filename,
    }).validate(req.query);
    if (error) {
      return badRequest(error.details[0].message, res);
    }
    const response = await service.deleteBook(req.query, req.query.filename);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};
