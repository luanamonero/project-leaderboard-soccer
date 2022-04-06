import { ClassificationI, CreateMatchI, LeaderBoardMatchs } from '../interfaces';
import Clubs from '../models/Clubs';
import Matchs from '../models/Matchs';


class LeaderBoardServices {
  static getPoints(data: CreateMatchI[]): ClassificationI {
    let points = 0;
    let totalVictories = 0;
    const gamesFinished = data.filter((game) => game.inProgress === false);
    const totalPoints = gamesFinished.reduce((_acc, dataClub) => {
      if (dataClub.homeTeamGoals > dataClub.awayTeamGoals) {
        points += 3;
        totalVictories += 1;
      }
      if (dataClub.homeTeamGoals === dataClub.awayTeamGoals) {
        points += 1;
      }
      return {
        totalPoints: points,
        totalGames: gamesFinished.length,
        totalVictories,
      };
    }, {});
    return totalPoints as ClassificationI;
  }

  static getDrawsAndLoses(data: CreateMatchI[]) {
    let totalDraws = 0;
    let totalLosses = 0;
    const gamesFinished = data.filter((game) => game.inProgress === false);
    const totaDrawsAndLoses = gamesFinished.reduce((_acc, dataClub) => {
      if (dataClub.homeTeamGoals < dataClub.awayTeamGoals) {
        totalLosses += 1;
      }
      if (dataClub.homeTeamGoals === dataClub.awayTeamGoals) {
        totalDraws += 1;
      }
      return {
        totalDraws,
        totalLosses,
      };
    }, {});
    return totaDrawsAndLoses;
  }

  static getGoalsDrawsLosers(data: CreateMatchI[]) {
    let goalsFavor = 0;
    let goalsOwn = 0;
    const gamesFinished = data.filter((game) => game.inProgress === false);
    const drawsAndLosers = LeaderBoardServices.getDrawsAndLoses(data);
    const totalGoals = gamesFinished.reduce((_acc, dataClub) => {
      goalsFavor += dataClub.homeTeamGoals;
      goalsOwn += dataClub.awayTeamGoals;

      return {
        ...drawsAndLosers,
        goalsFavor,
        goalsOwn,
        goalsBalance: goalsFavor - goalsOwn,
      };
    }, {});
    return totalGoals as ClassificationI;
  }

  static getEfficiency(points: ClassificationI) {
    const { totalPoints, totalGames } = points;
    const getEfficiency = (totalPoints / (totalGames * 3)) * 100;
    const efficiency = getEfficiency % 1 === 0 ? getEfficiency : getEfficiency.toFixed(2);
    return Number(efficiency);
  }

  static getClubsPoints(dataClubs: Clubs[]): ClassificationI[] {
    const result = dataClubs.map((club) => {
      const data = club as LeaderBoardMatchs;
      const clubsInfo = data.homeClub;
      const arrayMatchs = clubsInfo as CreateMatchI[];
      const getPoints = LeaderBoardServices.getPoints(arrayMatchs);
      const goals = LeaderBoardServices.getGoalsDrawsLosers(arrayMatchs);
      const efficiency = LeaderBoardServices.getEfficiency(getPoints);

      return {
        name: data.clubName,
        ...getPoints,
        ...goals,
        efficiency,
      };
    });
    return result;
  }

  static sortClassification(clubs: ClassificationI[]) {
    clubs.sort((clubA, clubB) => clubB.goalsOwn - clubA.goalsOwn);
    clubs.sort((clubA, clubB) => clubB.goalsFavor - clubA.goalsFavor);
    clubs.sort((clubA, clubB) => clubB.goalsBalance - clubA.goalsBalance);
    clubs.sort((clubA, clubB) => clubB.totalPoints - clubA.totalPoints);

    return clubs;
  }

  static async getClassification() {
    const result = await Clubs.findAll({
      include: [
        { model: Matchs, as: 'homeClub', attributes: { exclude: ['home_team', 'away_team'] } },
      ],
    });
    const dataClubs = LeaderBoardServices.getClubsPoints(result);
    return LeaderBoardServices.sortClassification(dataClubs);
  }
}

export default LeaderBoardServices;
