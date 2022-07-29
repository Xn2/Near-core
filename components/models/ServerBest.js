module.exports = (sequelize, DataTypes) => sequelize.define('ServerBest', {
    cardID: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    musicID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    musicType: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    score: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    freezeTableName: true,
});