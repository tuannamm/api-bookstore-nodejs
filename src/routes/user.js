import express from "express";
import * as controller from "../controller";

const router = express.Router();

router.get("/api/v1", controller.getUserList);

export default router;
