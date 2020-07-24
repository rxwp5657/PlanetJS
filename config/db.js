const { Sequelize, DataTypes } = require('sequelize');

exports.sequelize = new Sequelize('space', '', '', {
    host    : "localhost",
    dialect : "postgres",
    logging : false
});

exports.dataTypes = DataTypes;