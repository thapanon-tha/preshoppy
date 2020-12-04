const router = require("express").Router();
const { sql } = require("../database");
const upload = require("./upload");
const { v4: uuidv4 } = require('uuid');

router.post("/:id", async(req, res) => {
    try {
        u_id = Number(req.params.id)
        let gID = uuidv4();
        var filename = gID + ".jpg";
        id_path = './assets/ID_pic/' + filename
        command_path = './assets/Command_pic/' + filename
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
            return res.send('fail add');
        }
    } catch (err) {
        return res.send(err);
    }
})

module.exports = router;