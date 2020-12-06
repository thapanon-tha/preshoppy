const router = require("express").Router();
const crypto = require("crypto");

const database = require("../database");


router.post("/", async (req, res) => {
    const {
        email,
        password
    } = req.body;

    try {
        /* create hashed password */
        const hasher = crypto.createHash("SHA3-512");
        hasher.update(password);
        const hashedPassword = hasher.digest("hex");

        /* find user */
        const users = await database.exec`SELECT u_id FROM user WHERE u_email = ${email} AND u_password = ${hashedPassword}`;
        res.setHeader("content-type", "text/plain");
        if (users.length === 1) 
            res.sendStatus(200);
        else 
            res.sendStatus(403);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

module.exports = router;
