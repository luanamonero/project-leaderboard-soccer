import { Request, Response } from 'express';
import LeaderBoardServices from '../services/leaderBoard';
import LeaderboardAwayServices from '../services/leaderbordAway';

class LeaderBoardController {
  static async leaderBoardHome(req: Request, res: Response) {
    const result = await LeaderBoardServices.getClassification();
    return res.status(200).json(result);
  }

  static async leaderBoardAway(req: Request, res: Response) {
    const result = await LeaderboardAwayServices.getClassification();
    return res.status(200).json(result);
  }
}

export default LeaderBoardController;
