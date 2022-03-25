import { NextFunction, Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import * as fs from 'fs';
import MessageError from '../enums/MessagesErros';

const secret = fs.readFileSync('jwt.evaluation.key', 'utf8');

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: MessageError.tokenNotFound });
  }
  try {
    const decode = verify(authorization, secret) as JwtPayload;
    req.body = decode.data;
    next();
  } catch ({ message }) {
    res.status(401).json({ message: MessageError.invalidToken });
  }
};

export default auth;
