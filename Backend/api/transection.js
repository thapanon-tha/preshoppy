const router = require("express").Router();
const database = require("../database");

router.post("/create", async(req, res) => {
    const {
        t_evend_eid,
        t_vendor_uid,
        t_customer_uid,
    } = req.body;
    const currTimestamp = Date.now();
    console.log(currTimestamp);
    try {
        await database.exec `INSERT INTO transactions (t_timestamp, t_evend_eid, t_vendor_uid, t_customer_uid, t_status_tsid) 
        VALUES ( ${currTimestamp}, ${t_evend_eid}, ${t_vendor_uid}, ${t_customer_uid}, 1)`;
        return res.sendStatus(200);
    } catch (err) {
        console.error(err);
        return res.sendStatus(500);
    }
});

router.post("/addItem/:id", async(req, res) => {
    const t_id = parseInt(req.params.id);
    const items = req.body.itemlist
    if (items.length === 0) return res.sendStatus(400);
    try {
        for (const item of items)
            await database.exec `INSERT INTO transection_item(ti_item, ti_quantity, ti_price, ti_details, ti_tid) VALUES(${item.name}, ${item.quantity}, ${item.price}, ${item.details}, ${t_id})`;
        return res.sendStatus(200);
    } catch (err) { return res.send(err); }
})

router.get("/get/:id", async(req, res) => {
    const t_id = parseInt(req.params.id);
    try {
        const tranasaction = await database.exec `SELECT * from transactions WHERE t_id = ${t_id}`;
        const items = await database.exec `SELECT * from transection_item WHERE ti_tid = ${t_id}`;
        tranasaction.push({ items: items })
        return res.send(tranasaction);
    } catch (err) { return res.send(err); }
})


router.post("/setPaymentStatus/:id", async(req, res) => {
    const t_id = parseInt(req.params.id);
    //! need file send
    try {
        await database.exec `UPDATE transections 
        SET t_status_tsid = 2 
        WHERE t_id = ${t_id}`;
        return res.sendStatus(200)
    } catch (err) { return res.send(err) }
})

router.post("/setTrackingnumberStatus/:id", async(req, res) => {
    const t_id = parseInt(req.params.id);
    const trackingnumber = req.body.trackingnumber
    try {
        await database.exec `UPDATE transections 
        SET t_status_tsid = 3 ,t_tracking_id = ${trackingnumber}
        WHERE t_id = ${t_id}`;
        return res.sendStatus(200)
    } catch (err) { return res.send(err) }
})

router.post("/setAcceptStatus/:id", async(req, res) => {
    const t_id = parseInt(req.params.id);
    try {
        await database.exec `UPDATE transections 
        SET t_status_tsid = 4
        WHERE t_id = ${t_id}`;
        return res.sendStatus(200)
    } catch (err) { return res.send(err) }
})


module.exports = router;