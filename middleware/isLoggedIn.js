const userInfo = require("../Model/user");
const jwt = require("jsonwebtoken");

const isLogin = async (req, res, next) => {
  try {
    // console.log(req.headers["x-access-token"]);
    if (req.headers["x-access-token"]) {
      const token = req.headers["x-access-token"];
      const payload = jwt.verify(token, process.env.secret);
      // console.log(payload);
      if (payload && payload.user) {
        let user = await userInfo.findOne({
            _id: payload.user._id,
        });
        if (user) {
            req.user = user;
            next();
        } else {
            res.status(400).json({
                error: "User not found",
            });
        }
        } else {
            res.status(400).json({
                error: "User not found",
            });
        }
    } else {
        res.status(400).json({
            error: "User not found",
        });
    }
    } catch (err) {
        res.status(400).json({
            error: "User not found",
        });
    }
}

module.exports = { isLogin };