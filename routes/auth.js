const router = require("express").Router();
const { keycloak } = require("../middlewares/keycloak");

router.get("/", keycloak.protect(), (req, res) => {
  const kcObject = req.kauth.grant.access_token.content;

  console.log(kcObject);

  res.send("logged in");
});

router.get("/logout", (req, res) => {
  res.redirect(keycloak.logoutUrl(req));
});

module.exports = router;
