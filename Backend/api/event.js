const fs = require("fs");
const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");

const database = require("../database");
const {
    upload,
    uploadExtChecker,
    uploadPath 
} = require("../upload");

// get all event
router.get("/list", async(req, res) => {
    try {
        const data = await database.exec`SELECT * FROM events`;
        res.json(data);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

// get event detail
router.get("/get/:id", async(req, res) => {
    try {
        const id = parseInt(req.params.id);
        const data = await database.exec`SELECT * FROM events WHERE e_id = ${id}`;
        if (data.length === 0) return res.sendStatus(404);
        const [first] = data;
        res.json(first);
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
        /* upload event pic */
        if (!file) return res.sendStatus(400);

        const dotFileExt = uploadExtChecker(file.name, uploadPicExtsOpts);

        if (!dotFileExt) return res.sendStatus(400);
        const fileName = uuidv4() + dotFileExt;
        const filePath = `${uploadPath}/picture/event/${fileName}`;
        await upload(file, filePath);

        /* record to database */
        const ret = await database.exec`
INSERT INTO events (e_name, e_detail, e_start_date, e_end_date, e_location, e_contacts, e_img) 
VALUES (${name}, ${detail}, ${startDate}, ${endDate}, ${location}, ${contacts}, ${fileName})
`;
        res.status(200).send(`${ret.insertId}`);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
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
        const ret = await database.rawExec(`UPDATE events SET ${updateKeyString} WHERE e_id = ?`, updateValues);

        if (ret.affectedRows === 1) 
            res.sendStatus(200);
        else
            res.sendStatus(400);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

router.post("/delete/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const ret = await database.exec`SELECT e_img from events WHERE e_id = ${id}`;
        if (ret.length === 1) {
            /* remove uploaded image */
            try {
                fs.unlinkSync(`${uploadPath}/picture/event/${ret[0].e_img}`);
            } catch (e) {}
            /* remove entry from database */
            await database.exec`DELETE FROM events WHERE e_id = ${id}`;
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
