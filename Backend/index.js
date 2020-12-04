require("dotenv").config({ 
  silent: process.env.NODE_ENV === "production" 
});

const port = process.env.PORT || 3000;

const express = require("express");
const upload = require("express-fileupload");
const cors = require("cors");
const helmet = require("helmet");

const api = require("./api");

const app = express();
const pathapis = express.Router();

app.use(cors());
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(upload());

app.use(express.static("assets"));

/* Router api */
pathapis.use("/Events", api.Events);
pathapis.use("/Login", api.Login);
pathapis.use("/Register", api.Register);
pathapis.use("/upgradeAcc", api.upgradeAcc);

app.use("/api", pathapis);

/* trap for unused paths */
app.get("/", (_req, res) => {
  res.sendStatus(200);
});

app.use((_req, res) => {
  res.sendStatus(501);
});

/* set port for run server */ 
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
