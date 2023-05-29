import jwt, { TokenExpiredError } from "jsonwebtoken";
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
    if (err) {
      const isExpired = err instanceof TokenExpiredError;
      if (!isExpired) return unauthorized("Token is invalid", res, isExpired);
      return unauthorized("Token is invalid", res, isExpired);
    }
    // check token
    // decode giai ma token cua user va gan vao req.user
    req.user = userDecode;
    next();
  });
};

export default verifyToken;
