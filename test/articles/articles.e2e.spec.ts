import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { UiModule } from '@ui/ui.module';
import { MyLoggerMock } from '@infra/my-logger/my-logger.mock';

describe('articles', () => {
  const articleUuid = '95521d6d-f0dc-468e-800c-7ee6c95d0c18';
  let app: INestApplication;
  const loggerMock = new MyLoggerMock();

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UiModule],
    })
      .setLogger(loggerMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    loggerMock.reset();
  });

  it('list articles', async () => {
    await request(app.getHttpServer()).get('/articles').expect(200);
  });

  it('get one article', async () => {
    await request(app.getHttpServer())
      .get('/articles/' + articleUuid)
      .expect(200);
  });

  it('post article', async () => {
    const payload = { title: 'my title', content: 'my content of article' };
    const response = await request(app.getHttpServer()).post('/articles').send(payload).expect(201);
    expect(response.text).toContain('-'); // Check uuid response.

    // check pass.
    expect(loggerMock.logs[0]).toEqual('CreateANewArticleCommandHandler - handle title:"my title"');
    expect(loggerMock.logs[1]).toEqual('ArticleAgg - create title:"my title" content:"my content of article"');
    expect(loggerMock.logs[2]).toEqual(
      'ArticleAgg - onNewArticleCreated title:"my title" content:"my content of article"',
    );
    expect(loggerMock.logs[3]).toEqual(
      'NewArticleCreatedEventHandler - handle title:my title content:"my content of article"',
    );
  });

  it('put article', async () => {
    await request(app.getHttpServer())
      .put('/articles/' + articleUuid)
      .expect(200);
  });
});
