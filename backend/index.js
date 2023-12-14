const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
// const __dirname = path.resolve();

const noteRouter = require("./routes/notes");
const authRouter = require("./routes/auth");
var cors = require("cors");
const app = express();

require("dotenv").config();

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;

// db connection
const connectToMongo = () => {
  mongoose.connect(process.env.mongoURI);
  console.log("connected to MongoDB");
};

connectToMongo();

// Available Routes
app.use("/api/auth", authRouter);
app.use("/api/notes", noteRouter);

app.use(express.static(path.join(__dirname, "./frontend/build")));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./frontend/build/index.html"),
    function (error) {
      res.status(500).send(error);
    }
  );
});

app.listen(PORT, () => {
  console.log(`chal gya bro ${PORT} pe`);
});
