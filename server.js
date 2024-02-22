const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const serverIp = process.env.SERVERIP;

const userRoutes = require("./routes/userRoutes.js");

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/", userRoutes);

app.listen(port, "10.0.0.108", () => {
  console.log(`Server running on port ${port}`);
});
