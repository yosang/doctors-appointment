module.exports = (sequelize, DataTypes) => {
  const doctor = sequelize.define("Doctor", {
    name: DataTypes.STRING,
  });

  doctor.associate = (db) => {
    doctor.hasMany(db.Patient);
  };
  return doctor;
};
