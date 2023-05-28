import db from "../models";
require("dotenv").config();

import { Op } from "sequelize";

export const getBooks = ({ page, limit, order, name, available, ...query }) =>
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
      if (name) query.title = { [Op.substring]: name };
      if (available) query.available = { [Op.between]: available };
      const response = await db.Book.findAndCountAll({
        where: query,
        ...queries,
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
