import db from "../models";
import bcrypt from "bcrypt";
import jwt, { TokenExpiredError } from "jsonwebtoken";
require("dotenv").config();

// handle error
import { internalServerError, unauthorized } from "../middleware/handleError";
import { ref } from "joi";

const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(8));

// REGISTER
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
      const accessToken = response[1]
        ? jwt.sign(
            {
              id: response[0].id,
              email: response[0].email,
              role_code: response[0].role_code,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: "15d",
            }
          )
        : null;
      const refreshToken = response[1]
        ? jwt.sign(
            {
              id: response[0].id,
              role_code: response[0].role_code,
            },
            process.env.JWT_SECRET_REFRESH_TOKEN,
            {
              expiresIn: "15d",
            }
          )
        : null;
      if (refreshToken) {
        await db.User.update(
          { refresh_token: refreshToken },
          { where: { id: response[0].id } }
        );
      }
      resolve({
        err: response[1] ? 0 : 1,
        mes: response[1] ? "Register is success" : "User already exists",
        access_token: accessToken ? `Bearer ${accessToken}` : null,
        refresh_token: refreshToken,
      });
    } catch (error) {
      console.log(error);
    }
  });

// LOGIN
export const login = ({ email, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: { email },
        raw: true,
      });
      // check password
      const isCheckedPassword =
        response && bcrypt.compareSync(password, response.password);
      // nếu password đúng thì gắn token cho user
      const accessToken = isCheckedPassword
        ? jwt.sign(
            {
              id: response.id,
              email: response.email,
              role_code: response.role_code,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: "10s",
            }
          )
        : null;

      const refreshToken = isCheckedPassword
        ? jwt.sign(
            {
              id: response.id,
              role_code: response.role_code,
            },
            process.env.JWT_SECRET_REFRESH_TOKEN,
            {
              expiresIn: "15d",
            }
          )
        : null;
      if (refreshToken) {
        await db.User.update(
          { refresh_token: refreshToken },
          { where: { id: response.id } }
        );
      }
      resolve({
        err: accessToken ? 0 : 1,
        mes: accessToken
          ? "Login is success"
          : response
          ? "Wrong password"
          : "User not found",
        access_token: accessToken ? `Bearer ${accessToken}` : null,
        refresh_token: refreshToken,
      });
    } catch (error) {
      return internalServerError(reject, error);
    }
  });

// REFRESH TOKEN
export const refreshToken = (refreshToken) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: { refresh_token: refreshToken },
      });
      if (response) {
        jwt.verify(
          refreshToken,
          process.env.JWT_SECRET_REFRESH_TOKEN,
          (err) => {
            if (err) {
              resolve({
                err: 1,
                mes: "Refresh token expired. Require login",
              });
            } else {
              const accessToken = jwt.sign(
                {
                  id: response.id,
                  email: response.email,
                  role_code: response.role_code,
                },
                process.env.JWT_SECRET,
                { expiresIn: "2d" }
              );
              resolve({
                err: accessToken ? 0 : 1,
                msg: accessToken
                  ? "OK"
                  : "Fail to generate new access token. Let try more time",
                access_token: accessToken
                  ? `Bearer ${accessToken}`
                  : accessToken,
                refresh_token: refreshToken,
              });
            }
          }
        );
      }
    } catch (error) {
      reject(error);
    }
  });
