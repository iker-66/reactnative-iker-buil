import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module.js';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/criaturas (GET)', () => {
    return request(app.getHttpServer())
      .get('/criaturas')
      .expect(200)
      .expect((response) => expect(response.body).toHaveLength(3));
  });

  it('/criaturas/2 (GET)', () => {
    return request(app.getHttpServer())
      .get('/criaturas/2')
      .expect(200)
      .expect((response) => expect(response.body.nombre).toBe('Foxy'));
  });

  it('/criaturas/1/like (PATCH)', () => {
    return request(app.getHttpServer())
      .patch('/criaturas/1/like')
      .expect(200)
      .expect((response) => expect(response.body.likes).toBe(28));
  });

  it('returns 404 for a creature that does not exist', () => {
    return request(app.getHttpServer()).get('/criaturas/999').expect(404);
  });

  afterEach(async () => {
    await app.close();
  });
});
