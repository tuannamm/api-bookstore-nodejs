import { unauthorized } from "../middleware/handleError";

export const isAdmin = (req, res, next) => {
  // get role_code from req.user
  const { role_code } = req.user;
  // check role_code
  if (role_code !== "R1") return unauthorized("You are not admin", res);
  next();
};

export const isCreatorOrAdmin = (req, res, next) => {
  // get role_code from req.user
  const { role_code } = req.user;
  // check role_code
  if (role_code !== "R1" && role_code !== "R2")
    return unauthorized("You are not creator or admin", res);
  next();
};
