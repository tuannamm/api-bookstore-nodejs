import express from "express";
import * as controllers from "../controller";
import verifyToken from "../middleware/verifyToken";
import { isAdmin } from "../middleware/verifyRole";

const router = express.Router();

// PUBLIC ROUTES
router.get("/getBook", controllers.getBooks);

// PRIVATE ROUTES
router.use(verifyToken);
router.use(isAdmin);
router.post("/createBook", controllers.createBook);

export default router;
