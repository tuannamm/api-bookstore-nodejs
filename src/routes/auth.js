import express from "express";
import * as controller from "../controller";

const router = express.Router();

router.post("/register", controller.register);
router.post("/login", controller.login);

export default router;
