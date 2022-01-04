import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { MyLoggerMock } from '@infra/my-logger/my-logger.mock';
import { MyTestModule } from '@test/util/my-test.module';
import { FixtureService } from '@infra/fixture/fixture.service';
import { PrismaService } from '@infra/prisma/prisma.service';

describe('articles', () => {
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
  });

  it('put article', async () => {
    const articleUuid = '831af673-a758-4963-8bfb-6b58c20fd774';
    await fixture.loadAnArticle(articleUuid);

    // First update
    const payload = { title: 'my title 2', content: 'my content 2 of article' };
    const response = await request(app.getHttpServer())
      .put('/articles/' + articleUuid)
      .send(payload);
    expect(response.text).toEqual('true');

    // Second update
    const payload2 = { title: 'my title 3', content: 'my content 3 of article' };
    const response2 = await request(app.getHttpServer())
      .put('/articles/' + articleUuid)
      .send(payload2);
    expect(response2.text).toEqual('true');

    const response3 = await request(app.getHttpServer()).get('/articles/' + articleUuid);
    expect(response3.body.title).toEqual('my title 3');
  });

  it('like an article', async () => {
    const articleUuid = '6297fcdb-67ee-4370-9b5d-98f19aa07f95';
    await fixture.loadAnArticle(articleUuid);

    // Like the article.
    const response = await request(app.getHttpServer()).put('/articles/' + articleUuid + '/like');
    expect(response.status).toEqual(200);
    expect(response.text).toEqual('true');

    // Check the like.
    const response2 = await request(app.getHttpServer()).get('/articles/' + articleUuid);
    expect(response2.body.liked).toEqual(1);

    // Like again the article.
    const response3 = await request(app.getHttpServer()).put('/articles/' + articleUuid + '/like');
    expect(response3.status).toEqual(200);
    expect(response3.text).toEqual('true');

    // Check again the like.
    const response4 = await request(app.getHttpServer()).get('/articles/' + articleUuid);
    expect(response4.body.liked).toEqual(2);
  });
});
