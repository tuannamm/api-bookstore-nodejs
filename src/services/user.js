import db from "../models";

export const getUser = (userId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        // tim trong cot id cua bang user co gia tri = userId
        where: { id: userId },
        // khong tra ve cot password, createdAt, updatedAt
        attributes: { exclude: ["password", "createdAt", "updatedAt"] },
        // lay them cot roleData
        include: [
          {
            model: db.Role, // model can lay
            as: "roleData", // ten cua model
            attributes: ["id", "code", "value"], // lay nhung cot nao
          },
        ],
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
