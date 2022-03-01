module.exports = (sequelize, DataTypes) => sequelize.define('User', {
  cardID: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey : true
  },
  ign: {
    type: DataTypes.STRING,
    allowNull : true,
  },
  passCode: {
    type: DataTypes.INTEGER,
    allowNull : false,
  },
  skillLV: {
    type: DataTypes.INTEGER,
    allowNull : true,
  },
  apecaID : {
    type: DataTypes.INTEGER,
    allowNull : true,
  },
  session : {
    type: DataTypes.STRING,
    allowNull : true,
  },
  gameConfig : {
      type : DataTypes.JSON,
      allowNull : true
  },
  isComplete:{
    type : DataTypes.BOOLEAN,
    allowNull : false
  }
}, {
  freezeTableName : true,
});