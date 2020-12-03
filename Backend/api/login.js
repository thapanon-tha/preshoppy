const router = require("express").Router();
const bcrypt = require("bcrypt");
const { sql } = require("../database");

router.post("/login", async(req, res) => {
    const email = req.body.u_email
    const passwoed = req.body.u_password
    try {
        const user = await sql `SELECT u_email,u_password FROM user WHERE u_email = ${email}`
        if (!user) {
            return res.send("Email incorrect!!");
        } else {
            const passCheck = bcrypt.compareSync(password, user[0].u_password)
            if (passCheck) {
                return res.send("login success");
            } else {
                return res.send("password incorrect!!!");
            }
        }
    } catch (err) {
        console.error(err);
        return res.sendStatus(500);
    }

})



module.exports = router;