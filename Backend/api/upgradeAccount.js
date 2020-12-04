const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");

const database = require("../database");
const { 
  upload, 
  uploadPath 
} = require("../upload");

router.get("/list", async (req, res) => {
  try {
    const res = await database.exec`SELECT * FROM user WHERE u_vendor_status_uvsid = 4`;
    return res.send(res);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});

const statusNumLookup = {
  0: 3,
  1: 2
};

router.post("/set/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const status = parseInt(req.body.status);

    if (!status in statusNumLookup) return res.sendStatus(400);

    const statusNum = statusNumLookup[status];
    await database.exec`
UPDATE user 
SET u_vendor_status_uvsid = ${statusNum}
WHERE u_id = ${id}
`;
    return res.sendStatus(200)
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});

const allowedExt = [
  "jpg",
  "jpeg",
  "png",
  "bmp",
  "gif",
  "webp"
];

const uploadHelper = (file, path) => {
  if (!file) return false;
  const dotFileExt = path.extname(file.name);
  if (!dotFileExt) return false;
  const fileExt = dotFileExt.slice(1);
  if (!allowedExt.includes(fileExt)) return false;

  const fileName = uuidv4() + dotFileExt;
  const filePath = `${path}/${fileName}`;
  await upload(file, filePath);
  return fileName;
};

router.post("/add/:id", async (req, res) => {
  const { idPic, verifyPic } = req.files;

  try {
    const id = parseInt(req.params.id);

    const idPicUpload = uploadHelper(idPic, `${uploadPath}/picture/id`);
    const verifyPicUpload = uploadHelper(verifyPic, `${uploadPath}/picture/verify`);

    if (idPicUpload && verifyPicUpload) {
      await database.exec`
  UPDATE user
  SET u_id_img = ${idPicUpload}, 
  u_command_img = ${verifyPicUpload}, 
  u_vendor_status_uvsid = 4
  WHERE u_id = ${u_id}
  `;
      return res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});

module.exports = router;