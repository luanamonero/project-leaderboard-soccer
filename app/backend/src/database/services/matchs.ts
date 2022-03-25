import StatusCode from '../enums/StatusCode';
import { Match } from '../interfaces';
import Clubs from '../models/Clubs';
import Matchs from '../models/Matchs';

class MatchsServices {
  static async getMatchs() {
    const matchs = await Matchs.findAll({
      include: [
        { model: Clubs, as: 'homeClub', attributes: ['clubName'] },
        { model: Clubs, as: 'awayClub', attributes: ['clubName'] },
      ],
    });
    return { code: StatusCode.OK, response: matchs };
  }

  static async getByStatus(inProgress: boolean) {
    const matchs = await Matchs.findAll({
      where: { inProgress },
      include: [
        { model: Clubs, as: 'homeClub', attributes: ['clubName'] },
        { model: Clubs, as: 'awayClub', attributes: ['clubName'] },
      ],
    });
    return { code: StatusCode.OK, response: matchs };
  }

  static async create(data: Match) {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = data;
    const match = await Matchs.create({
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress,
    });
    return { code: StatusCode.CREATED,
      response: {
        id: match.id,
        homeTeam,
        homeTeamGoals,
        awayTeam,
        awayTeamGoals,
        inProgress,
      } };
  }

  static async finish(id: number, status: boolean) {
    await Matchs.update(
      { inProgress: status },
      { where: { id } },
    );
    return { code: StatusCode.OK, response: { inProgress: status } };
  }

  static async updateMatchs(id: number, homeTeamGoals: number, awayTeamGoals: number) {
    await Matchs.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
    return { code: StatusCode.OK, response: { homeTeamGoals, awayTeamGoals } };
  }
}

export default MatchsServices;
