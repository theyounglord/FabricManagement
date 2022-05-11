const express = require("express");
const { isLogin } = require("../middleware/isLoggedIn");


const router = express.Router();

//add routes for auth folder
router.use('/auth',require("./Auth/auth"));

module.exports = router;    