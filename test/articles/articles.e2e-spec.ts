import {INestApplication} from "@nestjs/common";
import * as request from 'supertest';
import {Test, TestingModule} from "@nestjs/testing";
import {AppModule} from "../../src/infra/app.module";

describe('articles', () => {
  const articleUuid = '95521d6d-f0dc-468e-800c-7ee6c95d0c18';
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it ('list articles', async () => {
    await request(app.getHttpServer())
      .get('/articles')
      .expect(200);
  });

  it ('get one article', async () => {
    await request(app.getHttpServer())
      .get('/articles/' + articleUuid)
      .expect(200);
  });

  it ('post article', async () => {
    await request(app.getHttpServer())
      .post('/articles')
      .expect(201);
  });

  it('put article', async () => {
    await request(app.getHttpServer())
      .put('/articles/' + articleUuid)
      .expect(200);
  });
});
