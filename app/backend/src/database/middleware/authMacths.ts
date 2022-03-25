import { NextFunction, Request, Response } from 'express';
import MessageError from '../enums/MessagesErros';

const authMatchs = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) {
      return res.status(401).json({ message: MessageError.tokenNotFound });
    }

    next();
  } catch ({ message }) {
    res.status(401).json({ message: MessageError.invalidToken });
  }
};

export default authMatchs;
