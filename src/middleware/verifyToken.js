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
    if (err) return unauthorized("Token is invalid", res);
    req.user = userDecode;
    next();
  });
};

export default verifyToken;
