import express from "express";
import * as controllers from "../controller";
import verifyToken from "../middleware/verifyToken";
import { isCreatorOrAdmin } from "../middleware/verifyRole";
import uploadCloud from "../middleware/cloudinary";
require("dotenv").config();

const router = express.Router();

// PUBLIC ROUTES
router.get("/getBook", controllers.getBooks);

// PRIVATE ROUTES
router.use(verifyToken);
router.use(isCreatorOrAdmin);
router.post("/createBook", uploadCloud.single("image"), controllers.createBook);
router.put("/updateBook", uploadCloud.single("image"), controllers.updateBook);
router.delete("/delete", controllers.deleteBook);

export default router;
