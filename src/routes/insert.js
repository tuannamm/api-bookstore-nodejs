import express from "express";
import * as controllers from "../controller";

const router = express.Router();

router.get("/", controllers.insertData);

export default router;
