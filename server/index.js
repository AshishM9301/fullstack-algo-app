const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();

// const { User } = require("./models/Users");
// const { UserSession } = require("./models/UserSession");
// const { Auth } = require("./middleware/Auth");
const config = require("./config/keys");
const routes = require("./routes");
const sockets = require("./sockets");
const { getMarketData, CEmarketData, PEmarketData } = require("./controllers");

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:8000",
    "http://localhost:8001/",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3001",
    "http://127.0.0.1:8000",
    "http://127.0.0.1:8003/",
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database is Connected"))
  .catch((err) => console.log(err));

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: corsOptions.origin,
  },
});

var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  if ("OPTIONS" == req.method) {
    res.send(200);
  } else {
    next();
  }
};

app.use(allowCrossDomain);

app.use("/", routes);

if (process.env.NODE_ENV === "production") {
  // Set Static Folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

io.on("connection", (socket) => {
  //   socket.on("send-market-data", marketDataController.sendData);
  socket.on("token", async (token) => {
    await getMarketData(token, socket);
    await CEmarketData(token, socket);
    await PEmarketData(token, socket);
  });
});

io.listen(5050);

app.listen(port, () => console.log(`Server Started on ${port}`));
