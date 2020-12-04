const path = require("path");
const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");

const database = require("../database");
const {
  upload,
  uploadPath 
} = require("../upload");

// get all event
router.get("/list", async(req, res) => {
  try {
    const data = await database.exec`SELECT * FROM events`;
    return res.json(data);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});

// get event detail
router.get("/get/:id", async(req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = await database.exec`SELECT * FROM events WHERE e_id = ${id}`;
    console.log(data.length);
    if (data.length === 0) return res.sendStatus(404);
    const first = [data];
    return res.json(first);
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

// * ADD EVENT
router.post("/add", async(req, res) => {
  const {
    name, 
    detail, 
    start_date: startDate, 
    end_date: endDate, 
    location, 
    contacts
  } = req.body;
  const { file } = req.files;

  try {
    if (!file) return res.sendStatus(400);
    const dotFileExt = path.extname(file.name);
    if (!dotFileExt) return res.sendStatus(400);
    const fileExt = dotFileExt.slice(1);
    if (!allowedExt.includes(fileExt)) return res.sendStatus(400);

    const fileName = uuidv4() + dotFileExt;
    const filePath = `${uploadPath}/picture/event/${fileName}`;
    await upload(file, filePath);

    await database.exec`
INSERT INTO events (e_name, e_detail, e_start_date, e_end_date, e_location, e_contacts, e_img) 
VALUES (${name}, ${detail}, ${startDate}, ${endDate}, ${location}, ${contacts}, ${fileName})
`;
    return res.sendStatus(200);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});

const editableKeys = [
  "name",
  "detail",
  "start_date",
  "end_date",
  "location",
  "contacts"
];

// update event detail
router.post("/edit/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const updateBody = req.body;
  try {
    const updateKeys = [];
    const updateValues = [];
    for (const key of editableKeys)
      if (key in updateBody) {
        const value = updateBody[key];
        updateKeys.push(`e_${key} = ?`);
        updateValues.push(value);
      }
    if (updateKeys.length === 0) return res.sendStatus(400);
    updateValues.push(id);
    const updateKeyString = updateKeys.join(",");
    await database.rawExec(`UPDATE events SET ${updateKeyString} WHERE e_id = ?`, updateValues);
    return res.sendStatus(200);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});

router.post("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await database.exec`DELETE FROM events WHERE e_id = ${id}`
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});

module.exports = router;
