module.exports = (sequelize, DataTypes) => sequelize.define('Score', {
    playID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
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
    },
    exscore: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    clearType: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    scoreGrade: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    maxChain: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    just: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    critical: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    near: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    error: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    effectiveRate: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    btnRate: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    longRate: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    volRate: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    mode: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    gaugeType: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    notesOption: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    onlineNum: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    localNum: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    challengeType: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    retryCnt: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    judge: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    dropFrame: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    dropFrameMax: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    dropCount: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    etc: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    mixID: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    mixLike: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    freezeTableName: true,
});