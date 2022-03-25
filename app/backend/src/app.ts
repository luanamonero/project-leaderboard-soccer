import * as express from 'express';
import * as cors from 'cors';
import LoginController from './database/controllers/login';
import { emailOrPasswordEmpty, validateCreate } from './database/middleware/login';
import auth from './database/middleware/auth';
import ClubsController from './database/controllers/clubs';
import MatchsController from './database/controllers/matchs';
import authMatchs from './database/middleware/authMacths';
import LeaderBoardController from './database/controllers/leaderboard';

class App {
  public app: express.Express;
  // ...

  constructor() {
    this.app = express();
    this.config();
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(express.json());
    this.app.use(cors());
  }

  // ...
  public start(PORT: string | number):void {
    this.app.post('/login', emailOrPasswordEmpty, validateCreate, LoginController.login);
    this.app.get('/login/validate', auth, LoginController.getLogin);
    this.app.get('/clubs', ClubsController.getClubs);
    this.app.get('/clubs/:id', ClubsController.getById);
    this.app.get('/matchs', MatchsController.getClubs);
    this.app.post('/matchs', authMatchs, MatchsController.create);
    this.app.patch('/matchs/:id', MatchsController.updateMatchs);
    this.app.patch('/matchs/:id/finish', MatchsController.finish);
    this.app.get('/leaderboard/home', LeaderBoardController.leaderBoardHome);
    this.app.get('/leaderboard/away', LeaderBoardController.leaderBoardAway);
    this.app.listen(PORT, () => console.log(`ouvindo porta ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
