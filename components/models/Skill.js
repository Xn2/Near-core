module.exports = (sequelize, DataTypes) => sequelize.define('Skill', {
    playID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cardID: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ssnid: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    crsid: {
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
    cm: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    ar: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cnt: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue : 0
    },
    locid: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    tr1: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    tr2: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    tr3: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    freezeTableName: true,
});