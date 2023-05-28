import db from "../models";

export const getUser = (userId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        // tim trong cot id cua bang user co gia tri = userId
        where: { id: userId },
        // khong tra ve cot password
        attributes: { exclude: ["password"] },
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "Get user success" : "User not found",
        userData: response ? response : null,
      });
    } catch (error) {
      reject(error);
    }
  });
