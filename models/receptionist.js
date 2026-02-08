module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Receptionist", {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
  });
};
