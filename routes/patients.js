const router = require("express").Router();
const db = require("../models/index");

router.get("/", (req, res) => {
  res.render("checkin");
});

router.post("/appointment", async (req, res) => {
  const { appointmentNumber } = req.body;

  try {
    const data = await db.Patient.findOne({ where: { appointmentNumber } });

    if (!data) return res.status(404).send("You dont seem to have an appointment with us, please call your doctor to book one");

    const { name: doctorName } = await db.Doctor.findByPk(data.DoctorId);

    res.render("queue", { name: data.name, doctor: doctorName });
  } catch (err) {
    console.log("Something went wrong");
    res.status(500).send("internal error");
  }
});

module.exports = router;
