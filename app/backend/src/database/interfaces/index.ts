import { Model } from 'sequelize/types';

export interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
}

export interface LoginRequeset {
  email: string;
  password: string;
}

export interface ILogin {
  user: IUser;
  token: string;
}

export interface CodeResponse {
  code: number;
  response?: any;
}

export interface IClubs {
  id: number;
  clubName: string;
}

export interface Match {
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  inProgress: boolean;
}
export interface IMatch extends Model, Match {
  id: number;
  homeClub: { clubName: string },
  awayClub: { clubName: string }
}

export interface CreateMatchI extends Model{
  id: number;
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export interface LeaderBoardMatchs {
  id: number;
  clubName: string;
  homeClub?: CreateMatchI[];
  awayClub?: CreateMatchI[];
}

export interface ClassificationI {
  name?: string;
  totalDraws: number;
  totalLosses: number;
  efficiency: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
}
