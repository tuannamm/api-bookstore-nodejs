const router = require("express").Router();

const userController = require("../controller/user");

router.get("/api/v1", userController);

module.exports = router;
