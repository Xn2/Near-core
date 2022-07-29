import { DataTypes, Model } from 'sequelize';
import { db } from '../sequelize';
interface IParam {
  cardID: string;
  type: number;
  paramID: number;
  param: string;
}

class Param extends Model<IParam, IParam> implements IParam {
  cardID!: string;
  type!: number;
  paramID!: number;
  param!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Param.init(
  {
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
  },
  {
    //@ts-ignore
    sequelize: db,
    freezeTableName: true,
  }
);

export default Param;
