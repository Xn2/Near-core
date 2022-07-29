import { DataTypes, Model, Optional } from 'sequelize';
import { db } from '../sequelize';
interface IApiUser {
  id: number;
  cardID: string;
  username: string;
  password: string;
  apiKey: string;
  isAdmin: boolean;
}
export interface IApiUserInput extends Optional<IApiUser, 'id' | 'apiKey'> {}

class ApiUser extends Model<IApiUser, IApiUserInput> implements IApiUser {
  public id!: number;
  public cardID!: string;
  public username!: string;
  public password!: string;
  public apiKey!: string;
  public isAdmin!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ApiUser.init(
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
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apiKey: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    //@ts-ignore
    sequelize: db,
    freezeTableName: true,
  }
);

export default ApiUser;
