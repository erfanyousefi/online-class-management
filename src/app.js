require("dotenv").config();
const express = require("express");
const {sequelize} = require("./models"); // از models/index.js
const routes = require("./routes");

const app = express();
app.use(express.json());
app.use("/api", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server listening on http://localhost:${PORT}`);
  await sequelize.authenticate();
  console.log("DB connected");
});
