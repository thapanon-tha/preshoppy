const router = require("express").Router();
const database = require("../database");

router.get("/info/:e_id", async(req, res) => {
    const e_id = parseInt(req.params.e_id);
    try {
        countEvent = await database.exec`
SELECT COUNT(m_customer_uid) AS customer_count, COUNT(m_vendor_uid) AS vendor_count 
FROM matching WHERE m_eid = ${e_id}
`;
        res.json(countEvent[0]);
    } catch (err) {
        res.send(err);
    }
});

router.post("/request/vendor/:id", async (req, res) => {
    const u_id = parseInt(req.params.id)
    const { e_id } = req.body
    try {
        resq = await database.exec` SELECT * FROM matching WHERE m_vendor_uid is NULL AND m_eid = ${e_id}`
        if(resq.lange === 0){
            database.exec`INSERT INTO matching (m_vendor_uid, m_eid)
            VALUES (${u_id},${e_id})`
        }else{
            await database.exec`UPDATE matching set m_vendor_uid = ${u_id} WHERE m_id = ${resq[0].m_id}`
        }

        console.log(ree)
        return res.send(ree)
    } catch (err) {
        return res.send(err)
    }
})

// SELECT * FROM matching WHERE m_customer_uid is NULL AND m_eid = 3

module.exports = router