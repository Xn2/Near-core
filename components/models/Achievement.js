module.exports = (sequelize, DataTypes) => sequelize.define('Achievement', {
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
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    freezeTableName: true,
});