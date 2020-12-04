const router = require("express").Router();
const bcrypt = require("bcrypt");
const { sql } = require("../database");
const upload = require("./upload");
const { v4: uuidv4 } = require('uuid');

router.post("/", async(req, res) => {
    try {
        u_email = req.body.u_email
        u_password = bcrypt.hashSync(req.body.u_password, 10);
        u_tel = req.body.u_tel
        u_fristname = req.body.u_fristname
        u_lastname = req.body.u_lastname
        let gID = uuidv4();
        var filename = gID + ".jpg";
        path = './assets/profile_pic/' + filename
        uploadStatus = upload(path, req.files.file);
        if (uploadStatus) {
            try {
                await sql `INSERT INTO 
            user  (  u_tel, u_password, u_email, u_firstname, u_lastname, u_role_urid, u_verdor_command_uvcid, u_vendor_status_uvsid, u_profile)
                        VALUES (${u_tel},${u_password},${u_email},${u_fristname},${u_lastname},4,1,1,${filename})`;
                return res.sendStatus(200);
            } catch (err) {
                return res.send(err);
            }
        } else {
            return res.send('fail add');
        }
    } catch (err) {
        return res.send(err);
    }
})

module.exports = router;