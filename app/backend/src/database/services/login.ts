import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import Users from '../models/Users';
import StatusCode from '../enums/StatusCode';

import { IUser } from '../interfaces';
import MessageError from '../enums/MessagesErros';

const secret = fs.readFileSync('jwt.evaluation.key', 'utf8');

const jwtConfig: jwt.SignOptions = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const errorRequest = () => ({
  code: StatusCode.UNAUTHENTICATED,
  response: { message: MessageError.invalidField },
});

class LoginServices {
  static async login(data: IUser) {
    const { email, password } = data;

    const findUser = await Users.findOne({ where: { email } }) as Users;
    if (!findUser) return errorRequest();

    const token: string = jwt.sign({ data: email }, secret, jwtConfig);

    const cript = bcrypt.compareSync(password, findUser.password);
    if (!cript) return errorRequest();

    const user = {
      id: findUser.id,
      username: findUser.username,
      role: findUser.role,
      email: findUser.email,
    };

    const result = { user, token };

    return { code: StatusCode.OK, response: result };
  }

  static async getLogin(email: string) {
    const user = await Users.findOne({
      where: { email },
    });
    return { code: StatusCode.OK, response: user?.role };
  }
}

export default LoginServices;
