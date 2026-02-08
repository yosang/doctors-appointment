const session = require("express-session");
const memoryStore = new session.MemoryStore();

const KeyCloak = require("keycloak-connect");
const keycloak = new KeyCloak({ store: memoryStore });

module.exports = { keycloak, memoryStore };
