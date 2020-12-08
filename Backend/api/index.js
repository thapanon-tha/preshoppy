const router = require("express").Router();

const Events = require("./event");

const Login = require("./login");
const Register = require("./register");

const UpgradeAccount = require("./upgradeAccount");

const Transaction = require("./transaction");

const Matching = require("./matching");


router.use("/event", Events);

router.use("/login", Login);
router.use("/register", Register);

router.use("/upgradeAccount", UpgradeAccount);

router.use("/transaction", Transaction);

router.use("/matching", Matching);

module.exports = router;