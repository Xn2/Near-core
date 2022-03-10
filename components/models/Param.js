module.exports = (sequelize, DataTypes) => sequelize.define('Param', {
    cardID: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    paramID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    param: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    freezeTableName: true,
});