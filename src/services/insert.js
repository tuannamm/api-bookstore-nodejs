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
      const categoriesData = Object.entries(data);
      // [[key, [1,2,3]]]
      categoriesData.forEach((category) => {
        category[1]?.map(async (book) => {
          await db.Book.create({
            id: book.upc,
            title: book.bookTitle,
            price: book.bookPrice,
            available: book.available,
            image: book.imageUrl,
            description: book.bookDescription,
            category_code: generateCode(category[0]),
          });
        });
      });

      resolve("Data inserted successfully");
    } catch (error) {
      reject(error);
    }
  });
