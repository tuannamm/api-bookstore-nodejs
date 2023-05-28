// controllers
import user from "./user";
import auth from "./auth";
import insert from "./insert";
import book from "./book";

// handle error
import { notFound } from "../middleware/handleError";

const initRoutes = (app) => {
  app.use("/api/v1/user", user);
  app.use("/api/v1/auth", auth);
  app.use("/api/v1/insert", insert);
  app.use("/api/v1/book", book);

  return app.use(notFound);
};

export default initRoutes;
