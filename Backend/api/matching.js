const router = require("express").Router();
const database = require("../database");

router.get("/info/:e_id", async (req, res) => {
    const e_id = parseInt(req.params.e_id);
    try {
        const countEvent = await database.exec`
SELECT COUNT(m_customer_uid) AS customer_count, COUNT(m_vendor_uid) AS vendor_count 
FROM matching WHERE m_eid = ${e_id}
`;
        const [first] = countEvent;
        res.json(first);
    } catch (err) {
        res.send(err);
    }
});

router.post("/request/vendor/:id", async (req, resp) => {
    const u_id = parseInt(req.params.id);
    const { e_id } = req.body;
    try {
        const res = await database.exec`SELECT * FROM matching WHERE m_vendor_uid is NULL AND m_eid = ${e_id}`;
        if (res.lange === 0) {
            await database.exec`
INSERT INTO matching (m_vendor_uid, m_eid)
VALUES (${u_id}, ${e_id})
`;
        } else {
            await database.exec`UPDATE matching set m_vendor_uid = ${u_id} WHERE m_id = ${res[0].m_id}`;
        }
    } catch (err) {
        return res.send(err)
    }
})

// 
router.post("/request/customer/:id", async (req, res) => {
    const u_id = parseInt(req.params.id)
    const { e_id } = req.body
    try {
        const resq = await database.exec` SELECT m_vendor_uid , COUNT(m_customer_uid) AS customer_count , m_id 
                                    FROM matching WHERE m_eid = ${e_id} AND m_vendor_uid IS NOT NULL
                                    GROUP BY m_vendor_uid  
                                    ORDER BY customer_count 
                                    ASC 
                                    LIMIT 1`
        if (resq[0] === undefined) {
            await database.exec`INSERT INTO matching (m_customer_uid, m_eid)
            VALUES (${u_id},${e_id})`
            return res.sendStatus(200)
        } else if (resq[0].customer_count === 0) {
            await database.exec`UPDATE matching set m_customer_uid = ${u_id} WHERE m_id = ${resq[0].m_id}`
            return res.sendStatus(200)
        } else {
            await database.exec`INSERT INTO matching (m_customer_uid, m_vendor_uid ,m_eid)
            VALUES (${u_id},${resq[0].m_vendor_uid},${e_id})`
            return res.sendStatus(200)
        }
    } catch (err) {
        resp.send(err);
    }
});



module.exports = router;
