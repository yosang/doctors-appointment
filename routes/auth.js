const router = require("express").Router();
const { keycloak } = require("../middlewares/keycloak");

router.get("/", keycloak.protect(), (req, res) => {
  res.render("patients");
});

module.exports = router;
