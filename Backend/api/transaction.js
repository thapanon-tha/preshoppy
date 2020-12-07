const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");

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
// Create transaction //
router.post("/create", async(req, res) => {
    const {
        event_eid,
        vendor_uid,
        customer_uid,
    } = req.body;

    try {
        await database.exec `
INSERT INTO transactions (t_event_eid, t_vendor_uid, t_customer_uid, t_status_tsid)
VALUES (${event_eid}, ${vendor_uid}, ${customer_uid}, 1)
`;
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

<<<<<<< HEAD
// Add itemlist //
router.post("/addItem/:id", async(req, res) => {
=======
router.post("/add/:id", async(req, res) => {
>>>>>>> edit database schema
    const id = parseInt(req.params.id);
    const { items } = req.body;
    console.log(items)
    if (items.length === 0)
        return res.sendStatus(400);
    try {
        for (const item of items)
            await database.exec `
INSERT INTO transaction_item (ti_item, ti_quantity, ti_price, ti_details, ti_tid) 
VALUES (${item.name}, ${item.quantity}, ${item.price}, ${item.details}, ${id})
`;
        res.sendStatus(200);
    } catch (err) {
        res.send(err);
    }
})

const editableKeys = [
    "name",
    "quantity",
    "price",
    "details",
    "id"
];
//TODO edit item list//
// need to test //
// * double loop //
router.post("/edit/:id", async(req, res) => {
    const id = parseInt(req.params.id, 10);
    const updateBody = req.body;
    try {
        const updateKeys = [];
        const updateValues = [];
        for (const key of editableKeys)
            if (key in updateBody) {
                const value = updateBody[key];
                updateKeys.push(`ti_${key} = ?`);
                updateValues.push(value);
            }
        if (updateKeys.length === 0) return res.sendStatus(400);
        updateValues.push(id);
        const updateKeyString = updateKeys.join(",");
        const ret = await database.rawExec(`UPDATE transaction_item SET ${updateKeyString} WHERE ti_id = ?`, updateValues);

        if (ret.affectedRows === 1)
            res.sendStatus(200);
        else
            res.sendStatus(400);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

// get transaction info 
router.get("/get/:id", async(req, res) => {
    const id = parseInt(req.params.id);
    try {
        const trans = await database.exec `SELECT * from transactions WHERE t_id = ${id}`;
        const items = await database.exec `SELECT * from transaction_item WHERE ti_tid = ${id}`;
        return res.json({
            ...trans,
            items
        });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
})

//! set transaction  status to wait tracking number //
router.post("/setPaymentStatus/:id", async(req, resp) => {
    const id = parseInt(req.params.id);
    const { file } = req.files;

    if (!file) return resp.sendStatus(400);
    const dotFileExt = uploadExtChecker(file.name, uploadPicExtsOpts);
    if (!dotFileExt) return resp.sendStatus(400);

    const fileName = uuidv4() + dotFileExt;
    const filePath = `${uploadPath}/picture/receipt/${fileName}`;

    try {
        await upload(file, filePath);

        const res = await database.exec `
UPDATE transactions
SET t_status_tsid = 2, t_receipt = ${fileName}
WHERE t_id = ${id} AND t_status_tsid = 1
`;
        if (res.affectedRows === 1)
            resp.sendStatus(200)
        else
            resp.sendStatus(400);
    } catch (err) {
        console.error(err);
        resp.sendStatus(500);
    }
})


//! set transaction  status to wait customer accept item //
//TODO test//
router.post("/setTrackingNumber/:id", async(req, resp) => {
    const t_id = parseInt(req.params.id);
    const {
        tracking_number: trackingNumber
    } = req.body

    if (!trackingNumber)
        return resp.sendStatus(400);

    try {
        const res = await database.exec `
UPDATE transactions
SET t_status_tsid = 3, 
t_tracking_id = ${trackingNumber}
WHERE t_id = ${t_id} AND t_status_tsid = 2
`;
        if (res.affectedRows === 1)
            resp.sendStatus(200)
        else
            resp.sendStatus(400);
    } catch (err) {
        console.error(err);
        resp.sendStatus(500);
    }
});

//! set transaction  status to complete//
//TODO test//
router.post("/setAcceptStatus/:id", async(req, resp) => {
    try {
        const t_id = parseInt(req.params.id);
        const res = await database.exec `
UPDATE transactions
SET t_status_tsid = 4
WHERE t_id = ${t_id} AND t_status_tsid = 3
`;
        if (res.affectedRows === 1)
            resp.sendStatus(200)
        else
            resp.sendStatus(400);
    } catch (err) {
        console.error(err);
        resp.sendStatus(500);
    }
});

module.exports = router;
