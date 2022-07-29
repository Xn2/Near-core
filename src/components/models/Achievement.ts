import { DataTypes, Model } from 'sequelize';
import { db } from '../sequelize';
interface IAchievement {
  cardID: string;
  type: number;
  paramID: number;
  param: string;
}

class Achievement
  extends Model<IAchievement, IAchievement>
  implements IAchievement
{
  cardID!: string;
  type!: number;
  paramID!: number;
  param!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Achievement.init(
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

export default Achievement;
