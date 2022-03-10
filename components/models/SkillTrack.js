module.exports = (sequelize, DataTypes) => sequelize.define('SkillTrack', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement : true
    },
    cardID: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    st: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    sc: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    ex: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    ct: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    gr: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    jr: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cr: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    nr: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    er: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    pr: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    freezeTableName: true,
});