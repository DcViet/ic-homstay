"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
      // define association here
    }
  }
  Message.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      subject: DataTypes.STRING,
      message: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Message",
    }
  );
  return Message;
};
