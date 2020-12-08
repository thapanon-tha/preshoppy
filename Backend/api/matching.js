const router = require("express").Router();
const database = require("../database");

router.get("/info/:e_id", async(req, res) => {
    e_id = parseInt(req.params.e_id)
    try {
        countEvent = await database.exec`SELECT COUNT(m_customer_uid) AS customer_count , COUNT(m_vendor_uid) AS vendor_count 
        FROM matching WHERE m_eid = ${e_id}`;
        return res.json(countEvent[0]);
    } catch (err) {
        return res.send(err);
    }
})


module.exports = router