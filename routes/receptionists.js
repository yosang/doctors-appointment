const router = require("express").Router();
const { keycloak } = require("../middlewares/keycloak");

router.get("/", keycloak.protect(), (req, res) => {
  res.render("reception");
});

router.get("/logout", (req, res) => {
  res.redirect(keycloak.logoutUrl(req));
});

module.exports = router;
