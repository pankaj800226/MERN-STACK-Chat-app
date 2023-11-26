const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const mongoose = require("mongoose");


const app = express();
//PORT number
const PORT = 5000
//medial Waire
app.use(cors());
app.use(express.json());    //this is a data received to client

// createServer
const server = http.createServer(app); //create a node js server work

//connect to detaBase
mongoose.connect("mongodb://127.0.0.1:27017/Chat-app-data", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const firstDb = mongoose.connection;
console.log(`firstDB connected ${firstDb}`);

firstDb.on("error", (error) => {
  console.log(`firstDb connected ${error}`);
});

const ChatModle = firstDb.model(
  "User",
  new mongoose.Schema({
    name: {
      type: String,
      require: true,
    },

    email: {
      type: String,
      require: true,
    },

    password: {
      type: String,
      require: true,
    },
  })
);

//router
app.post("/signup", (req, res) => {
  ChatModle.create(req.body)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  ChatModle.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("Successfull");
      } else {
        res.password("The password rong");
      }
    } else {
      res.json("No Record");
    }
  });
});

//socket.io server create
const io = new Server(server, {
  //create a socket.io server work
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

//socket connection
io.on("connection", (socket) => {
  console.log(`user connected : ${socket.id}`);

  socket.on("send-message", (message) => {
    //send all users message connected client
    io.emit("received-message", message);
    console.log(message);
  });

  socket.on("disconnect", () => {
    console.log("user disconnect");
  });
});

//server port
server.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
