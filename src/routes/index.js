// port
import user from "./user";
import auth from "./auth";

// handle error
import {
  badRequest,
  internalServerError,
  notFound,
} from "../middleware/handleError";

const initRoutes = (app) => {
  app.use("/api/v1/user", user);
  app.use("/api/v1/auth", auth);

  return app.use(notFound);
};

export default initRoutes;
