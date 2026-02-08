require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const db = require("./models");

const session = require("express-session");
const { keycloak, memoryStore } = require("./middlewares/keycloak.js");

app.use(
  session({
    secret: "super_secret",
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
  }),
);
app.use(express.urlencoded());

app.use(keycloak.middleware());
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

const patientsRouter = require("./routes/patients.js");
const receptionRouter = require("./routes/receptionists.js");
const auth = require("./routes/auth.js");

app.use("/", patientsRouter);
app.use("/receptionist", receptionRouter);
app.use("/auth", auth);

db.sequelize
  .sync({ alter: true, force: true }) // force: true, drops tables, alter: true, sequelisze will try to change existing tables (columns, column types, etc)
  .then(() => {
    db.Doctor.bulkCreate([{ name: "dr.John" }, { name: "dr.Lisa" }, { name: "dr.Ola" }]);

    db.Patient.bulkCreate([
      { appointmentNumber: "1234", name: "Marcus", DoctorId: 1 },
      { appointmentNumber: "2222", name: "Mariell", DoctorId: 2 },
      { appointmentNumber: "4444", name: "Heidi", DoctorId: 1 },
      { appointmentNumber: "3243", name: "Berta", DoctorId: 3 },
    ]);
  })
  .then(() => app.listen(port, () => console.log("Express is running on port", port)))
  .catch(console.error);
