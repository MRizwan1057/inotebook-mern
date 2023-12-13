const express = require("express");
const mongoose = require("mongoose");

const noteRouter = require("./routes/notes");
const authRouter = require("./routes/auth");
var cors = require("cors");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3000;

// db connection
const connectToMongo = () => {
  mongoose.connect(process.env.mongoURI);
  console.log("connected to MongoDB");
};

connectToMongo();

// Available Routes
app.use("/api/auth", authRouter);
app.use("/api/notes", noteRouter);

app.listen(port, () => {
  console.log(`chal gya bro ${port} pe`);
});
