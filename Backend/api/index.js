const router = require("express").Router();

const Events = require("./event");

const Login = require("./login");
const Register = require("./register");

const UpgradeAccount = require("./upgradeAccount");

router.use("/event", Events);

router.use("/login", Login);
router.use("/register", Register);

router.use("/upgradeAccount", UpgradeAccount);

module.exports = router;
