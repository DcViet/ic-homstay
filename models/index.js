"use strict";

require('dotenv').config();

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";


const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
  database: process.env.DB_DATABASE,
  ssl: {
      rejectUnauthorized: true,
      ca: fs.readFileSync(path.resolve(__dirname, process.env.DB_SSL_CA_CERT_PATH)).toString(),
  },
};


const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  port: config.port,
  dialect: config.dialect,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false, 
    },
  },
});

const db = {};

// Đọc và khởi tạo các model từ thư mục models
fs.readdirSync(path.join(__dirname, "sqlModels"))
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, "sqlModels", file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Test kết nối
sequelize
  .authenticate()
  .then(() => {
    console.log("Kết nối thành công đến cơ sở dữ liệu");
  })
  .catch((err) => {
    console.error("Không thể kết nối đến cơ sở dữ liệu:", err);
  });

module.exports = db;
