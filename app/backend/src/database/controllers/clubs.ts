import { Request, Response } from 'express';
import { CodeResponse } from '../interfaces';
import ClubsServices from '../services/clubs';

class ClubsController {
  static async getClubs(req: Request, res: Response) {
    const { code, response }: CodeResponse = await ClubsServices.getClubs();
    return res.status(code).json(response);
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params;
    const { code, response }: CodeResponse = await ClubsServices.getById(Number(id));
    return res.status(code).json(response);
  }
}

export default ClubsController;
