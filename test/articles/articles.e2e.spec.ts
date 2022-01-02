import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { MyLoggerMock } from '@infra/my-logger/my-logger.mock';
import { MyTestModule } from '@test/util/my-test.module';
import { FixtureService } from '@infra/fixture/fixture.service';
import { PrismaService } from '@infra/prisma/prisma.service';

describe('articles', () => {
  const articleUuid = '95521d6d-f0dc-468e-800c-7ee6c95d0c18';
  let app: INestApplication;
  let fixture: FixtureService;
  const loggerMock = new MyLoggerMock();

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MyTestModule],
    })
      .setLogger(loggerMock)
      .compile();

    app = moduleFixture.createNestApplication();
    fixture = moduleFixture.get(FixtureService);
    const prisma = moduleFixture.get(PrismaService);
    await prisma.event.deleteMany({});
    await app.init();
    loggerMock.reset();
  });

  it('list articles', async () => {
    const loadArticles = [
      '831af673-a758-4963-8bfb-6b58c20fd774',
      'b3318b5f-387d-4fb4-ae8d-daa7221762c6',
      '7d38efe7-cb76-4329-8098-b9f8482bb299',
    ].map(articleUuid => fixture.loadAnArticle(articleUuid));
    await Promise.all(loadArticles);
    const result = await request(app.getHttpServer()).get('/articles').expect(200);
    expect(result).not.toBeNull();
    expect(result.body[0].title).not.toBeUndefined();
    expect(result.body[1].title).not.toBeUndefined();
    expect(result.body[2].title).not.toBeUndefined();
    expect(result.body[3]).toBeUndefined();
  });

  it('get one article', async () => {
    const articleUuid = '831af673-a758-4963-8bfb-6b58c20fd774';
    await fixture.loadAnArticle(articleUuid);
    const response = await request(app.getHttpServer()).get('/articles/' + articleUuid);
    expect(response.status).toEqual(200);
    expect(response.body.uuid).toEqual(articleUuid);
    expect(response.body.title).not.toBeUndefined();
    expect(response.body.title).not.toBeNull();
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
