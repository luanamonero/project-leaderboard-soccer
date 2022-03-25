import StatusCode from '../enums/StatusCode';
import { IClubs } from '../interfaces';
import Clubs from '../models/Clubs';

class ClubsServices {
  static async getClubs() {
    const clubs = await Clubs.findAll() as IClubs[];
    return { code: StatusCode.OK, response: clubs };
  }

  static async getById(id: number) {
    const club = await Clubs.findByPk(id) as IClubs;
    return { code: StatusCode.OK, response: club };
  }
}

export default ClubsServices;
