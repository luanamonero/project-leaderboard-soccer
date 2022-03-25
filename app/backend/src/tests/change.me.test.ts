import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { app } from '../app';

import { Response } from 'superagent';
import { clubsMock, matches, matchsMock, mockFalse, mockTrue, responseUser, userMock } from './mock';
import User from '../database/models/Users';
import Clubs from '../database/models/Clubs';
import Matchs from '../database/models/Matchs';
import { IMatch } from '../database/interfaces';


chai.use(chaiHttp);

const { expect } = chai;
describe('Testa a rota login', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves(userMock as User);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('verifica a rota login', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(responseUser)
    
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.a('object');
    expect(chaiHttpResponse.body).to.include.all.keys('user','id','username','role','email','token');
  });

  it('verifica  a rota login/validate', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/login/validate')
       .send('admin')

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.a('string');
    expect(chaiHttpResponse.body).to.be.eq('admin');
  });
});

describe('Testa a rota clubs', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Clubs, "findAll")
      .resolves(clubsMock as Clubs[]);
  });

  after(()=>{
    (Clubs.findAll as sinon.SinonStub).restore();
  })

  it('verifica a rota clubs', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/clubs')
       .send()

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.a('array');
    expect(chaiHttpResponse.body).to.length(3);
    expect(chaiHttpResponse.body).to.deep.equal(clubsMock);
  });
});

describe('Testa a rota clubs/:id', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Clubs, "findByPk")
      .resolves(clubsMock[1] as Clubs);
  });

  after(()=>{
    (Clubs.findByPk as sinon.SinonStub).restore();
  })

  it('verifica a rota clubs/:id', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/clubs/:id')
       .send()

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.be.a('object');
      expect(chaiHttpResponse.body).to.include.all.keys('id','clubName');
      expect(chaiHttpResponse.body).to.be.eq(clubsMock[1])
  });
});


describe('Testa a rota matchs', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Matchs, "findAll")
      .resolves(matchsMock as IMatch[]);
  });

  after(()=>{
    (Clubs.findAll as sinon.SinonStub).restore();
  })

  it('verifica a rota macths', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/clubs')
       .send()

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.a('array');
    expect(chaiHttpResponse.body).to.deep.equal(matchsMock);
  });
});


describe('retorna partidas em progresso ', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Matchs, 'findAll')
      .resolves(mockTrue as IMatch[]);
  });

  after(()=>{
    (Matchs.findAll as sinon.SinonStub).restore();
  })

  it('Retorna todas as partidas em progresso', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/matchs?inProgress=true')
       .send()

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.a('array');
    expect(chaiHttpResponse.body).to.deep.equal(mockTrue);
  });
});

describe('retorna partidas que NÃO estão progresso ', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Matchs, 'findAll')
      .resolves(mockFalse as IMatch[]);
  });

  after(()=>{
    (Matchs.findAll as sinon.SinonStub).restore();
  })

  it('Retorna todas as partidas em progresso', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/matchs?inProgress=false')
       .send()

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.a('array');
    expect(chaiHttpResponse.body).to.deep.equal(mockFalse);
  });
});
