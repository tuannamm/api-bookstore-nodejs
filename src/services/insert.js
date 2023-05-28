import db from "../models";
import data from "../../data/data.json";
import { generateCode } from "../helpers/fn";

export const insertData = () =>
  new Promise(async (resolve, reject) => {
    try {
      // Insert data to table categories
      const categories = Object.keys(data);
      categories.forEach(async (category) => {
        await db.Category.create({
          code: generateCode(category),
          value: category,
        });
      });
      resolve("Data inserted successfully");
    } catch (error) {
      reject(error);
    }
  });
