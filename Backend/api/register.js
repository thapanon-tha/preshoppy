const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");

const database = require("../database");
const { 
    upload,
    uploadExtChecker,
    uploadPath 
} = require("../upload");

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

router.post("/", async (req, resp) => {
    const {
        email, 
        password, 
        first_name: firstName,
        last_name: lastName,
        tel
    } = req.body;
    const { file } = req.files;

    try {
        const res = await database.exec`SELECT u_id FROM user WHERE u_email = ${email}`;
        if (res.length > 0) return resp.sendStatus(400);
        
        /* create hashed password */
        const hasher = crypto.createHash("SHA3-512");
        hasher.update(password);
        const hashedPassword = hasher.digest("hex");

        /* upload profile pics */
        if (!file) return resp.sendStatus(400);

        const dotFileExt = uploadExtChecker(file.name, uploadPicExtsOpts);

        if (!dotFileExt) return resp.sendStatus(400);

        const fileName = uuidv4() + dotFileExt;
        const filePath = `${uploadPath}/picture/profile/${fileName}`;

        await upload(file, filePath);
        /* record to database */
        await database.exec`
INSERT INTO user (u_email, u_password, u_firstname, u_lastname, u_tel, u_profile, u_role_urid, u_vendor_command_uvcid, u_vendor_status_uvsid)
VALUES (${email}, ${hashedPassword}, ${firstName}, ${lastName}, ${tel}, ${fileName}, 4, 1, 1);
`;
        resp.sendStatus(200);
    } catch (err) {
        console.error(err);
        resp.sendStatus(500);
    }
});

module.exports = router;