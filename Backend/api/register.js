const router = require("express").Router();
const bcrypt = require("bcrypt");
const { sql } = require("../database");

router.post("/register", async(req, res => {
    try {

    } catch (err) {
        return res.send(err);
    }
}))

module.exports = router;