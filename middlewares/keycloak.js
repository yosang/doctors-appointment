const session = require("express-session");
const memoryStore = new session.MemoryStore();

const KC_ADMIN_USERNAME = process.env.KC_ADMIN_USERNAME || "admin";
const KC_ADMIN_PASSWORD = process.env.KC_ADMIN_PASSWORD || "admin";
const KC_REALM = process.env.KC_REALM;
const KC_TEST_USER = process.env.KC_TEST_USER;
const KC_TEST_USER_PW = process.env.KC_TEST_USER_PW;

const KeyCloak = require("keycloak-connect");
const keycloak = new KeyCloak({ store: memoryStore });

const KeycloakAdminClient = require("@keycloak/keycloak-admin-client").default;

const kcAdmin = new KeycloakAdminClient({
  baseUrl: "http://localhost:8080",
  realmName: "master",
});

(async function createUser() {
  try {
    // Authentication
    await kcAdmin.auth({
      username: KC_ADMIN_USERNAME,
      password: KC_ADMIN_PASSWORD,
      grantType: "password",
      clientId: "admin-cli",
    });

    // Check if user exists
    const users = await kcAdmin.users.find({
      realm: KC_REALM,
      username: KC_TEST_USER,
    });

    // If not, create one and set a password for it
    if (!users.length) {
      const receptionist = await kcAdmin.users.create({
        realm: KC_REALM,
        username: KC_TEST_USER,
        enabled: true,
        email: "julia@email.com",
        firstName: "julia",
        lastName: "roberts",
      });

      await kcAdmin.users.resetPassword({
        realm: KC_REALM,
        id: receptionist.id,
        credential: {
          type: "password",
          value: KC_TEST_USER_PW,
          temporary: false,
        },
      });
    }
  } catch (err) {
    console.log(err);
  }
})();

module.exports = { keycloak, memoryStore };
