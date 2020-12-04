require("dotenv").config({ 
  silent: process.env.NODE_ENV === "production" 
});

const port = process.env.PORT || 3000;


const http = require("http");
const express = require("express");
const upload = require("express-fileupload");
const socketio = require("socket.io");
const cors = require("cors");

const app = express();
const httpServer = http.createServer(app);
const io = socketio(httpServer);

app.use(cors());

const api = require("./api");
const rt = require("./rt");

const { uploadPath } = require("./upload");

app.use(express.json());
app.use(express.urlencoded({ 
  extended: false 
}));
app.use(upload());

app.use("/upload", express.static(uploadPath));

/* Router api */
app.use("/api", api);

/* trap for unused paths */
app.get("/", (_req, res) => {
  res.sendStatus(200);
});

app.use((_req, res) => {
  res.sendStatus(501);
});

rt.attach(httpServer);

/* set port for run server */ 
httpServer.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
