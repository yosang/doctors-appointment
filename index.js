require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const db = require("./models");

app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

const patientsRouter = require("./routes/patients.js");
const auth = require("./routes/patients.js");

app.use("/patients", patientsRouter);
app.use("/auth", auth);

db.sequelize
  .sync({ alter: true, force: false }) // force: false, doesnt drop tables, alter: true, sequelisze will try to change existing tables (columns, column types, etc)
  .then(() => app.listen(port, () => console.log("Express is running on port", port)))
  .catch(console.error);
