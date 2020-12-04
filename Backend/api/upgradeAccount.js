const router = require("express").Router();

const { sql } = require("../database");
const upload = require("../upload");

const { v4: uuidv4 } = require("uuid");


router.get("/getQueue", async(req, res) => {
    try {
        inQueue = await sql `SELECT * FROM user WHERE u_vendor_status_uvsid = 4`
        return res.send(inQueue)
    } catch (err) {
        return res.send(err)
    }
})

router.post("/setStatus/:id", async(req, res) => {
    u_id = Number(req.params.id)
    status = req.body.status
    if (status == 0) {
        try {
            await sql `UPDATE user 
        SET u_vendor_status_uvsid = 2
        WHERE u_id = ${u_id}`
            return res.sendStatus(200)
        } catch (err) {
            return res.send(err)
        }
    } else {
        try {
            await sql `UPDATE user 
                SET u_vendor_status_uvsid = 3
                WHERE u_id = ${u_id}`
            return res.sendStatus(200)
        } catch (err) {
            return res.send(err)
        }
    }
})


router.post("/addQueue/:id", async(req, res) => {
    try {
        u_id = Number(req.params.id)
        let gID = uuidv4();
        var filename = gID + ".jpg";
        id_path = "./assets/ID_pic/" + filename
        command_path = "./assets/Command_pic/" + filename
        uploadIDStatus = upload(id_path, req.files.id_pic);
        uploadCOMMANDStatus = upload(command_path, req.files.command_pic);
        if (uploadIDStatus && uploadCOMMANDStatus) {
            try {
                await sql `UPDATE user
                        SET u_id_img = ${filename} , u_command_img = ${filename} , u_vendor_status_uvsid = 4
                        WHERE u_id = ${u_id}`;
                return res.sendStatus(200);
            } catch (err) {
                return res.send(err);
            }
        } else {
            return res.send("fail add");
        }
    } catch (err) {
        return res.send(err);
    }
})

module.exports = router;