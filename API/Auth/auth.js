  // const router = require("express").Router();
const { body, validationResult } = require("express-validator");

// define router
const router = require("express").Router();
const {
    signup,
    login,
} = require("../../services/auth");
// const { body } = require("express-validator");

const {isLogin} = require('../../middleware/isLoggedIn');


router.post("./signup", 
    [ // validation rules
        body("name").not().isEmpty(),
        body("email").isEmail(),
        body("password").isLength({ min: 6 }),
        body("phone").isLength({ min: 10 }),
    ],
    signup
);

module.exports = router;