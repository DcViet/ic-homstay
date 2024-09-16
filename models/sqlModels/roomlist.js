"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {

    class RoomList extends Model {
        static associate(models) {
            // define association here

        };
    }
    RoomList.init(
        {
            roomName: DataTypes.STRING,
            roomTitle: DataTypes.STRING,
            roomSummary: DataTypes.TEXT,
            imagePath: DataTypes.STRING,
            imagePlus: DataTypes.STRING,
            imageAlt: DataTypes.STRING,
            roomPrice: DataTypes.DECIMAL(10,2),
        },
        {
            sequelize,
            modelName: "RoomList",
        }
    );
    return RoomList;
};