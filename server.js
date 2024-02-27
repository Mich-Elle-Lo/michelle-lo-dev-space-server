require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
// const serverIp = process.env.SERVERIP;
const SERVER_IP = process.env.SERVER_IP;
const path = require("path");

const userRoutes = require("./routes/userRoutes.js");

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/", userRoutes);

app.listen(port, SERVER_IP, () => {
  console.log(`Server running on port ${port}`);
});
