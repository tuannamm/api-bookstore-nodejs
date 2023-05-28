import jwt from "jsonwebtoken";
import { unauthorized } from "./handleError";

const verifyToken = (req, res, next) => {
  // get token from header
  const token = req.headers.authorization;
  // check token
  if (!token) return unauthorized("Token is required", res);
  // lay phan token sau chu Bearer
  const accessToken = token.split(" ")[1];
  // verify token
  jwt.verify(accessToken, process.env.JWT_SECRET, (err, userDecode) => {
    // check token
    if (err) return unauthorized("Token is invalid", res);
    // decode giai ma token cua user va gan vao req.user
    req.user = userDecode;
    next();
  });
};

export default verifyToken;
