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
        allowNull: false,
    },
    just: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    critical: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    near: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    error: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    effectiveRate: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
        allowNull: false,
    },
    gaugeType: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    notesOption: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    onlineNum: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    localNum: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    challengeType: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    retryCnt: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    judge: {
        type: DataTypes.STRING,
        allowNull: false,
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
        allowNull: false,
    },
    mixLike: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    freezeTableName: true,
});