import db from "../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
require("dotenv").config();

const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(8));

export const register = ({ email, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOrCreate({
        where: { email },
        defaults: {
          email,
          password: hashPassword(password),
        },
      });
      const token = response[1]
        ? jwt.sign(
            {
              id: response[0].id,
              email: response[0].email,
              role_code: response[0].role_code,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: "5h",
            }
          )
        : null;
      resolve({
        err: response[1] ? 0 : 1,
        mes: response[1] ? "Register is success" : "User already exists",
        token,
      });
    } catch (error) {
      reject(error);
    }
  });

export const login = ({ email, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: { email },
        raw: true,
      });
      // check password
      const isChecked =
        response && bcrypt.compareSync(password, response.password);
      // nếu password đúng thì gắn token cho user
      const token = isChecked
        ? jwt.sign(
            {
              id: response.id,
              email: response.email,
              role_code: response.role_code,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: "5h",
            }
          )
        : null;
      resolve({
        err: token ? 0 : 1,
        mes: token
          ? "Login is success"
          : response
          ? "Wrong password"
          : "User not found",
        access_token: token ? `Bearer ${token}` : null,
        test_log: response,
      });
    } catch (error) {
      reject(error);
    }
  });
