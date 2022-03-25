import { Model, DataTypes } from 'sequelize';
import db from '.';

export default class Matchs extends Model {
  id: number;

  homeTeam: number;

  homeTeamGoals: number;

  awayTeam: number;

  awayTeamGoals: number;

  inProgress: boolean;
}

Matchs.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  homeTeam: {
    type: DataTypes.NUMBER,
  },
  homeTeamGoals: {
    type: DataTypes.NUMBER,
  },
  awayTeam: {
    type: DataTypes.NUMBER,
  },
  awayTeamGoals: {
    type: DataTypes.NUMBER,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
  },
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
});
