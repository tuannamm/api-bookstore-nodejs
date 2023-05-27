const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("node", "root", null, {
  host: "localhost",
  dialect: "mysql",
  port: 3309,
  logging: false,
});

const connectiondb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.log("Unable to connect to the database:", error);
  }
};

connectiondb();

module.exports = connectiondb;
