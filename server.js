const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");

const userRoutes = require("./routes/userRoutes.js");

app.use(cors());
app.use(express.json());

app.use("/", userRoutes);
// app.use("/", userRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
