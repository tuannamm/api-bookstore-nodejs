import express from "express";
import * as controller from "../controller";
import verifyToken from "../middleware/verifyToken";
import { isAdmin } from "../middleware/verifyRole";

const router = express.Router();

router.use(verifyToken);
// router.use(isAdmin);
router.get("/getDataCurrentUser", controller.getDataCurrentUser);

export default router;
