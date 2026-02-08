const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("patients");
});

module.exports = router;
