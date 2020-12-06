const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");

const database = require("../database");
const {
    upload,
    uploadExtChecker,
    uploadPath
} = require("../upload");

router.get("/list", async(req, resp) => {
    try {
        const res = await database.exec `SELECT u_id, u_firstname, u_lastname, u_reputation, u_profile, u_id_img, u_command_img FROM user WHERE u_vendor_status_uvsid = 4`;
        resp.json(res);
    } catch (err) {
        console.error(err);
        resp.sendStatus(500);
    }
});

const statusNumLookup = {
    0: 3,
    1: 2
};

router.post("/set/:id", async(req, res) => {
    try {
        const id = parseInt(req.params.id);
        const status = parseInt(req.body.status);

        if (!status in statusNumLookup) return res.sendStatus(400);

        const statusNum = statusNumLookup[status];
        await database.exec `
UPDATE user 
SET u_vendor_status_uvsid = ${statusNum}
WHERE u_id = ${id}
`;
        res.sendStatus(200)
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

const uploadPicExtsOpts = {
    allowedExts: [
        "jpg",
        "jpeg",
        "png",
        "bmp",
        "gif",
        "webp"
    ]
};

const uploadPicHelper = async (file, path) => {
    if (!file) return false;

    const dotFileExt = uploadExtChecker(file.name, uploadPicExtsOpts);

    if (!dotFileExt) return false;

    const fileName = uuidv4() + dotFileExt;
    const filePath = `${path}/${fileName}`;
    await upload(file, filePath);

    return fileName;
};

router.post("/add/:id", async(req, res) => {
    const { 
        id_pic: idPic, 
        verify_pic: verifyPic 
    } = req.files;

    try {
        const id = parseInt(req.params.id);

        /* upload evidence that use to verify identity of account */
        const idPicUpload = await uploadPicHelper(idPic, `${uploadPath}/picture/id`);
        const verifyPicUpload = await uploadPicHelper(verifyPic, `${uploadPath}/picture/verify`);

        if (idPicUpload && verifyPicUpload) {
            /* record to database */
            await database.exec `
UPDATE user
SET u_id_img = ${idPicUpload}, 
u_command_img = ${verifyPicUpload}, 
u_vendor_status_uvsid = 4
WHERE u_id = ${id}
`;
            res.sendStatus(200);
        } else {
            res.sendStatus(400);
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

module.exports = router;