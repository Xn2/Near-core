import { DataTypes, Model } from 'sequelize';
import { db } from '../sequelize';

interface ISkill {
  playID: number;
  cardID: string;
  ssnid: number;
  crsid: number;
  sc: number;
  ex: number;
  ct: number;
  gr: number;
  jr: number;
  cr: number;
  nr: number;
  er: number;
  cm: number;
  ar: number;
  cnt: number;
  locid: number;
  tr1: number;
  tr2: number;
  tr3: number;
}

class Skill extends Model<ISkill, ISkill> implements ISkill {
  playID!: number;
  cardID!: string;
  ssnid!: number;
  crsid!: number;
  sc!: number;
  ex!: number;
  ct!: number;
  gr!: number;
  jr!: number;
  cr!: number;
  nr!: number;
  er!: number;
  cm!: number;
  ar!: number;
  cnt!: number;
  locid!: number;
  tr1!: number;
  tr2!: number;
  tr3!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Skill.init(
  {
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
      defaultValue: 0,
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
  },
  {
    //@ts-ignore
    sequelize: db,
    freezeTableName: true,
  }
);

export default Skill;
