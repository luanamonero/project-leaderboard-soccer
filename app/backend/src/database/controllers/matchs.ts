import { Request, Response } from 'express';
import { CodeResponse, Match } from '../interfaces';
import MessageError from '../enums/MessagesErros';
import StatusCode from '../enums/StatusCode';
import Clubs from '../models/Clubs';
import MatchsServices from '../services/matchs';

class MatchsController {
  static async getClubs(req: Request, res: Response) {
    const { inProgress } = req.query;
    const status = (inProgress === 'true');
    if (inProgress) {
      const { code, response }: CodeResponse = await MatchsServices.getByStatus(status);
      return res.status(code).json(response);
    }
    const { code, response }: CodeResponse = await MatchsServices.getMatchs();
    return res.status(code).json(response);
  }

 static async create(req: Request, res: Response) {
    const { code, response }: CodeResponse = await MatchsServices.create(req.body);
    return res.status(code).json(response);
  }

  static async finish(req: Request, res: Response) {
    const { id } = req.params;
    const { inProgress } = req.body;
    const status = (inProgress === 'true');
    const { code, response }: CodeResponse = await MatchsServices.finish(Number(id), status);
    return res.status(code).json(response);
  }

  static async updateMatchs(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals, inProgress } = req.body;
    const status = (inProgress === 'true');
    if (inProgress === false) {
      const { code, response }: CodeResponse = await MatchsServices.finish(Number(id), status);
      return res.status(code).json(response);
    }
    const { code, response }: CodeResponse = await MatchsServices
      .updateMatchs(Number(id), homeTeamGoals, awayTeamGoals);
    return res.status(code).json(response);
  }
}

export default MatchsController;
