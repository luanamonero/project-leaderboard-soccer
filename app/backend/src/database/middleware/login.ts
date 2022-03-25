import { NextFunction, Request, Response } from 'express';
import MessageError from '../enums/MessagesErros';
import StatusCode from '../enums/StatusCode';

const validatePassword = (password:string) => {
  if (password.length < 9) throw Error(MessageError.invalidField);
};

const validateEmail = (email:string) => {
  if (!/^\S+@\S+\.\S+$/.test(email)) throw Error(MessageError.invalidField);
};

const emailOrPasswordEmpty = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(StatusCode.UNAUTHENTICATED)
      .json({ message: MessageError.emptyField });
  }
  next();
};

const validateCreate = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    validateEmail(email);
    validatePassword(password);
    next();
  } catch ({ message }) {
    return res.status(StatusCode.UNAUTHENTICATED).json({ message });
  }
};

export { validateCreate, emailOrPasswordEmpty };
