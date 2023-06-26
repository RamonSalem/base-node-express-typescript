import request from 'supertest';
import ExpressServer from '../src/config/express';
import { Application } from 'express';
import { environment } from '../src/config/environment';
import App from '../src/config/app';

describe('Example routes test case', () => {
  let app: Application | null = null;

  beforeAll(function (done) {
    App.initMongo()
      .then(() =>
        App.startServer()
          .then(() => {
            app = ExpressServer.express;
            jest
              .spyOn<any, any>(environment, 'isEnvValid')
              .mockReturnValue(true);
            done();
          })
          .catch((err) => done(err))
      )
      .catch((err) => done(err));
  });

  afterAll(function (done) {
    ExpressServer.closeServer();
    App.stopMongo().then(() => done());
  });

  it('Should POST example correctly', (done) => {
    request(app)
      .post('/examples')
      .send({ text: 'abc' })
      .expect(201)
      .expect((res) => expect(res.body).toMatchObject({ success: true }))
      .end((err) => {
        if (err) {
          return done(err);
        }
        return done();
      });
  });
});
