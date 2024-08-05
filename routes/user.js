const express = require("express");
const{ handelUserSignup, handelUserLogin } = require("../controllers/user");

const router = express.Router();

router.post("/", handelUserSignup)
router.post("/login", handelUserLogin)

module.exports = router;