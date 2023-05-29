import db from "../models";
require("dotenv").config();

import { Op } from "sequelize";
import { v4 as generateId } from "uuid";

// READ
export const getBooks = ({ page, limit, order, title, available, ...query }) =>
  new Promise(async (resolve, reject) => {
    try {
      // raw: true => lay ra du lieu dang object
      // nest: true => lay ra du lieu dang array
      const queries = { raw: true, nest: true };
      const offset = !page || +page <= 1 ? 0 : +page - 1;
      const finalLimit = +limit || +process.env.LIMIT_BOOK;
      // vi tri muon bat dau lay
      queries.offset = offset * finalLimit;
      queries.limit = finalLimit;
      if (order) queries.order = [order];
      if (title) query.title = { [Op.substring]: title };
      if (available) query.available = { [Op.between]: available };
      const response = await db.Book.findAndCountAll({
        where: query,
        ...queries,
        attributes: {
          exclude: ["createdAt", "updatedAt", "description"],
        },
        include: [
          {
            model: db.Category,
            as: "category",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "Success" : "Failed",
        data: response,
      });
    } catch (error) {
      console.log(error);
    }
  });

// CREATE
export const createBook = (body, fileData) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Book.findOrCreate({
        // kiem title xem co ton tai hay khong
        where: { title: body?.title },
        // khong thi tao cai moi
        defaults: {
          ...body,
          id: generateId(),
          image: fileData?.path,
          filename: fileData?.filename,
        },
      });
      resolve({
        err: response[1] ? 0 : 1,
        msg: response[1] ? "Created Success!" : "Created Failed!",
      });
      if (fileData && !response[1])
        cloudinary.uploader.destroy(fileData.filename);
    } catch (error) {
      reject(error);
      if (fileData && !response[1])
        cloudinary.uploader.destroy(fileData.filename);
    }
  });

// UPDATE
export const updateBook = ({ bookId, ...body }, fileData) =>
  new Promise(async (resolve, reject) => {
    try {
      if (fileData) body.image = fileData?.path;
      const response = await db.Book.update(body, {
        where: { id: bookId },
      });
      resolve({
        err: response[0] > 0 ? 0 : 1,
        msg:
          response[0] > 0 ? `${response[0]} book updated` : "Updated Failed!",
      });
      if (fileData && !response[1])
        cloudinary.uploader.destroy(fileData.filename);
    } catch (error) {
      reject(error);
    }
  });

// DELETE
export const deleteBook = ({ bookIds }, filename) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Book.destroy({
        where: { id: bookIds },
      });
      resolve({
        err: response > 0 ? 0 : 1,
        msg: response > 0 ? `${response} book deleted` : "Deleted Failed!",
      });
      cloudinary.api.delete_resources(filename);
    } catch (error) {
      reject(error);
    }
  });
