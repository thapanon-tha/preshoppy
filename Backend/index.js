require("dotenv").config({ silent: process.env.NODE_ENV === "production" });
const port = process.env.PORT || 3000;
const fetch = require("node-fetch")
const express = require('express');
const api = require("./api");
const cors = require("cors");
const helmet = require("helmet");
const app = express();
const pathapis = express.Router();
const upload = require('express-fileupload');
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(upload());

pathapis.use("/Events", api.Events);
pathapis.use("/Login", api.Login);
pathapis.use("/Register", api.Register);

app.get('/tests', (req, res) => {
    return res.sendFile(__dirname + "/src/index.html")
})

/* Router api */
app.use("/api", pathapis);

/* not impliment */
app.get("/", (req, res) => {
    res.sendStatus(200);
});

app.use(express.static("assets"));

app.use((req, res) => {
    res.sendStatus(501);
});



///////// set port for run server///////////
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});