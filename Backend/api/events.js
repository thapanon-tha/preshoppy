const { json } = require('express');
const { v4: uuidv4 } = require('uuid');
const router = require("express").Router();
const { sql } = require("../database");



// * GET ALL EVENT
router.get("/getEvents", async(req, res) => {
    try {
        const data = await sql `SELECT * FROM events`;
        return res.json(data);
    } catch (err) {
        console.error(err);
        return res.sendStatus(500);
    }
})

// * GET EVENT DETAIL
router.get("/getEvent/:id", async(req, res) => {
    const id = Number(req.params.id);
    try {
        const data = await sql `SELECT * FROM events WHERE e_id = ${id}`;
        console.log(data[0])
        if (data[0] === undefined) return res.sendStatus(404)
        return res.json(data[0]);
    } catch (err) {
        console.error(err);
        return res.sendStatus(500);
    }
})


// * ADD EVENT
router.post("/addEvent", async(req, res) => {
    let gID = uuidv4();
    let event
    event = req.body.events
    console.log(event);

    if (req.files) {
        var file = req.files.file;
        var filename = gID + ".jpg";
        console.log(req.files.file)
            // ! Use when deploy to host //
            // const pathimg = "https://salty-hollows-37281.herokuapp.com/eventpic/" + filename
        const pathimg = "https://localhost:3000/eventpic/" + filename
        console.log(pathimg);
        file.mv('./assets/eventpic/' + filename, async function(err) {
            if (err) {
                res.send(err);
            } else {
                try {
                    await sql `INSERT INTO 
                        events  ( e_name, e_detail, e_start_date, e_end_date, e_location, e_contacts, e_img)
                                    VALUES (${event.e_name}, ${event.e_detail}, ${event.e_start_date}, ${event.e_end_date}, ${event.e_location},${event.e_contacts},${pathimg} )`;
                    return res.sendStatus(200);
                } catch (err) {
                    console.error(err);
                    return res.sendStatus(500);
                }
            }
        })
    } else {
        res.send("Has NO file");
    }

})


// * UPDATE EVENT Datail
router.post("/updateEvent/:id", async(req, res) => {
    const e_id = Number(req.params.id)
    const newDetail = req.body
    console.log(e_id)
    console.log(newDetail)
    try {
        let eventDetail = await sql `SELECT * FROM events WHERE e_id = ${e_id} `;
        eventDetail[0].e_name = !newDetail.name ? eventDetail[0].e_name : newDetail.name
        eventDetail[0].e_detail = !newDetail.detail ? eventDetail[0].e_detail : newDetail.detail
        eventDetail[0].e_start_date = !newDetail.start_date ? eventDetail[0].e_start_date : newDetail.start_date
        eventDetail[0].e_end_date = !newDetail.end_date ? eventDetail[0].e_end_date : newDetail.end_date
        eventDetail[0].e_location = !newDetail.location ? eventDetail[0].e_location : newDetail.location
        eventDetail[0].e_contacts = !newDetail.contacts ? eventDetail[0].e_contacts : newDetail.contacts
        await sql `UPDATE events
                        SET e_name = ${eventDetail[0].e_name}, 
                        e_detail = ${eventDetail[0].e_detail}, 
                        e_start_date = ${eventDetail[0].e_start_date}, 
                        e_end_date = ${eventDetail[0].e_end_date}, 
                        e_location = ${eventDetail[0].e_location}, 
                        e_contacts = ${eventDetail[0].e_contacts}
                        WHERE e_id = ${e_id} `;
        return res.sendStatus(200);
    } catch (err) {
        console.error(err);
        return res.sendStatus(500);
    }
})

router.post("/deleteEvent/:id", async(req, res) => {
    const e_id = req.params.id
    try {
        await sql `DELETE FROM events WHERE e_id =${e_id};`
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        return res.sendStatus(500);
    }
})





module.exports = router;