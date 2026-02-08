module.exports = (sequelize, DataTypes) => {
  const patient = sequelize.define("Patient", {
    phoneNumber: DataTypes.STRING,
    name: DataTypes.STRING,
  });

  patient.associate = (db) => {
    patient.belongsTo(db.Doctor);
  };

  return patient;
};
