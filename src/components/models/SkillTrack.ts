import { DataTypes, Model, Optional } from 'sequelize';
import { db } from '../sequelize';

interface ISkillTrack {
  id: number;
  cardID: string;
  st: number;
  sc: number;
  ex: number;
  ct: number;
  gr: number;
  jr: number;
  cr: number;
  nr: number;
  er: number;
  pr: number;
}
export interface ISkillTrackInput extends Optional<ISkillTrack, 'id'> {}

class SkillTrack
  extends Model<ISkillTrack, ISkillTrackInput>
  implements ISkillTrack
{
  id!: number;
  cardID!: string;
  st!: number;
  sc!: number;
  ex!: number;
  ct!: number;
  gr!: number;
  jr!: number;
  cr!: number;
  nr!: number;
  er!: number;
  pr!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

SkillTrack.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
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
  },
  {
    //@ts-ignore
    sequelize: db,
    freezeTableName: true,
  }
);

export default SkillTrack;
