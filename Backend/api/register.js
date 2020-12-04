const path = require("path");
const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");

const database = require("../database");
const { 
  upload, 
  uploadPath 
} = require("../upload");

const allowedExt = [
  "jpg",
  "jpeg",
  "png",
  "bmp",
  "gif",
  "webp"
];

router.post("/", async (req, res) => {
  const {
    email, 
    password, 
    first_name: firstName,
    last_name: lastName,
    tel
  } = req.body;
  const { file } = req.files;

  try {
    const hasher = crypto.createHash("SHA3-512");
    hasher.update(password);
    const hashedPassword = hasher.digest("hex");

    if (!file) return res.sendStatus(400);
    const dotFileExt = path.extname(file.name);
    if (!dotFileExt) return res.sendStatus(400);
    const fileExt = dotFileExt.slice(1);
    if (!allowedExt.includes(fileExt)) return res.sendStatus(400);

    const fileName = uuidv4() + dotFileExt;
    const filePath = `${uploadPath}/picture/profile/${fileName}`;
    await upload(file, filePath);

    await database.exec`
INSERT INTO user (u_email, u_password, u_firstname, u_lastname, u_tel, u_profile, u_role_urid, u_vendor_command_uvcid, u_vendor_status_uvsid)
VALUES (${email}, ${hashedPassword}, ${firstName}, ${lastName}, ${tel}, ${fileName}, 4, 1, 1);
`;
    return res.sendStatus(200);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});

module.exports = router;