"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
// const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
// const config = require(__dirname + '/../config/config.json')[env];

const config = {
  user: "avnadmin",
  password: "AVNS_NXXLy3Qm6mgXZQOq39S",
  host: "pg-ic71302-ic-71302.c.aivencloud.com",
  port: 28236,
  dialect: "postgres",
  database: "ic71302DB",
  ssl: {
      rejectUnauthorized: true,
      ca: `-----BEGIN CERTIFICATE-----
MIIEQTCCAqmgAwIBAgIUUCfWdQ26+Cqvc2V3NbR7//hnYk4wDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvYjI1YTNjY2MtYzZkZS00MzEyLWJlZTYtMGIzMDJhMGRh
Y2QyIFByb2plY3QgQ0EwHhcNMjQwOTE1MDc0NDMyWhcNMzQwOTEzMDc0NDMyWjA6
MTgwNgYDVQQDDC9iMjVhM2NjYy1jNmRlLTQzMTItYmVlNi0wYjMwMmEwZGFjZDIg
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAIlQNPQY
qVbdCcRdpjA3FUwCMvrXVY7C0DAAjT3qSF3RO+iP27yxIrl4tvjb7C0yiVaVBSmx
cnFVJ+y2vmgcimNV+RIn+iY+No+M7ih0UtegYGwycZICL+sQQCJ/k501rf+FEujv
p9CEv+6HJ0bKqanE6xxC46DJuJEAvyvTGJHfulqXQ6p2HnS7M0QSB3eg6xyN/zf6
OKbf/KDjyb1HX6LOHI4CeoPXgoRuPSeA9HV8ZAjJqJqw3E2cGMhkbTQab+Zdiz2J
mGYxRXu0JjcrVzvBfLCVv0eu9cqFTBHJqnsO8C5Ps07jW4IdPJRypJnh6HLnoIh8
RwXk/7yRrnfsB1Fb/782S7H5PWSFLv8SCcZm9e9/G9MSZJK88uI3d6XUuWEbZ9WA
UWo87RgN5oj7kRYy0fxu/kUYJ6urmh32lF2/GvKEOGeQWK4R3CVlct7gPGqROGAW
Cj/Um7juWygQRc5fZQX72vaig8sTQOwF1r3sPqSjy1XD6/TqAOhULklklwIDAQAB
oz8wPTAdBgNVHQ4EFgQUvNyUOfBS2fOF3kyr0HNcIIywD0gwDwYDVR0TBAgwBgEB
/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAAEfUEDT+Xr7ZYWT
OySoRRLTrTg8gJ+/qtJp8lKtjD8udC8ZaD9uJVdXsBEVX66VEz35SCC/psRN/VO6
0dolPY4aVprrFLfeEsL0qShXAFEPZEDBd65LMmDa1zqS80FT2Gg2VisRKxbduy+X
e5Owfp8bgNmCa+DbAd5+1pJr9F07Vm6RxwduVGMyX5UAwDAtWex0xsN8Famv7TbO
y3PMG0jk8LXIZOw2X7yQDILZV0CB6mNrsUfm7rvO1AthQuRiErRyNE/iYMwdpYPz
ghaCeI5TB9m3Yoa5xe1LYtAgRG7xxKZf/x1jflGHfJwUGa0b6bRhQhNf9NF+qLt0
OG744Ja8O5/eYIP4pbxRz00MbJMIBgnb4TqD/zm2DowUCPACu0fSOto55K9iND/t
VuJ1FqJ0Y/MZ00mw8pW87SymrTmKoS3nAkRJNRA5SVYzSqZ6BI0kQj+TIqYM3jl9
16QOLpsLBPNUunsfW5pd+K4fR48koFKsHp0QLPj0OyYSUm5Hxg==
-----END CERTIFICATE-----`,
  },
};


const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  port: config.port,
  dialect: config.dialect,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false, // Bỏ qua việc xác minh chứng chỉ SSL
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
