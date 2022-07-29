import { DataTypes, Model, Optional } from 'sequelize';
import { db } from '../sequelize';

export interface IUser {
  cardID: string;
  ign: string;
  passCode: number;
  friendCode: string;
  skillLV: number;
  apecaID: number;
  session: string;
  gameConfig: any;
  rivals: any;
  isComplete: boolean;
  isClaimed: boolean;
}
export interface IUserInput
  extends Optional<IUser, 'ign' | 'skillLV' | 'apecaID' | 'session'> {}

class User extends Model<IUser, IUserInput> implements IUser {
  cardID!: string;
  ign!: string;
  passCode!: number;
  friendCode!: string;
  skillLV!: number;
  apecaID!: number;
  session!: string;
  gameConfig!: any;
  rivals!: any;
  isComplete!: boolean;
  isClaimed!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    cardID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    ign: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    passCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    friendCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    skillLV: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    apecaID: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    session: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gameConfig: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    rivals: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    isComplete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    isClaimed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    //@ts-ignore
    sequelize: db,
    freezeTableName: true,
  }
);

export default User;
