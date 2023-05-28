import express from "express";
import * as controller from "../controller";

const router = express.Router();

router.get("/getBook", controller.getBooks);

export default router;
