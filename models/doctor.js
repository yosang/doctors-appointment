module.exports = (sequelize, DataTypes) => {
  const doctor = sequelize.define("Doctor", {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
  });

  doctor.associate = (db) => {
    doctor.hasMany(db.Patient);
  };
  return doctor;
};
