import { Request, Response } from 'express';
import { CodeResponse, IUser } from '../interfaces';
import LoginServices from '../services/login';

class LoginController {
  static async login(req: Request, res: Response) {
    const user: IUser = req.body;

    const { code, response }: CodeResponse = await LoginServices.login(user);
    return res.status(code).json(response);
  }

  static async getLogin(req: Request, res: Response) {
    const { code, response }: CodeResponse = await LoginServices.getLogin(req.body);
    return res.status(code).json(response);
  }
}

export default LoginController;
