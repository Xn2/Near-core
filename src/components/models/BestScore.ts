import { DataTypes, Model } from 'sequelize';
import { db } from '../sequelize';

export interface IBestScore {
  playID: number;
  cardID: string;
  musicID: number;
  musicType: number;
  score: number;
  exscore: number;
  clearType: number;
  scoreGrade: number;
  maxChain: number;
  just: number;
  critical: number;
  near: number;
  error: number;
  effectiveRate: number;
  btnRate: number;
  longRate: number;
  volRate: number;
  mode: number;
  gaugeType: number;
  notesOption: number;
  onlineNum: number;
  localNum: number;
  challengeType: number;
  retryCnt: number;
  judge: string;
  dropFrame: number;
  dropFrameMax: number;
  dropCount: number;
  etc: string;
  mixID: number;
  mixLike: number;
}

class BestScore extends Model<IBestScore, IBestScore> implements IBestScore {
  playID!: number;
  cardID!: string;
  musicID!: number;
  musicType!: number;
  score!: number;
  exscore!: number;
  clearType!: number;
  scoreGrade!: number;
  maxChain!: number;
  just!: number;
  critical!: number;
  near!: number;
  error!: number;
  effectiveRate!: number;
  btnRate!: number;
  longRate!: number;
  volRate!: number;
  mode!: number;
  gaugeType!: number;
  notesOption!: number;
  onlineNum!: number;
  localNum!: number;
  challengeType!: number;
  retryCnt!: number;
  judge!: string;
  dropFrame!: number;
  dropFrameMax!: number;
  dropCount!: number;
  etc!: string;
  mixID!: number;
  mixLike!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

BestScore.init(
  {
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
  },
  {
    //@ts-ignore
    sequelize: db,
    freezeTableName: true,
  }
);

export default BestScore;
