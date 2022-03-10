module.exports = (sequelize, DataTypes) => sequelize.define('ApiUser', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey : true,
      autoIncrement: true,
    },
    cardID : {
        type: DataTypes.STRING,
        allowNull : false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull : false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull : false,
    },
    apiKey: {
      type: DataTypes.STRING,
      allowNull : true,
    },
    isAdmin:{
      type : DataTypes.BOOLEAN,
      allowNull : false
    }
  }, {
    freezeTableName : true,
  });