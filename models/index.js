const { Sequelize, DataTypes } = require("sequelize");
const fs = require("fs");
const db = {};

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
  logging: false,
});

db.sequelize = sequelize;

const models = fs.readdirSync(__dirname).filter((f) => f.endsWith(".js") && f !== "index.js");

for (const model of models) {
  const filePath = __dirname + "/" + model;
  const modelInstance = require(filePath)(sequelize, DataTypes);
  db[modelInstance.name] = modelInstance;
}

for (const key in db) {
  if (db[key].associate) {
    db[key].associate(db);
  }
}

module.exports = db;
