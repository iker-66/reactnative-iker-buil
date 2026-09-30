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

  it('/heroes/1 (GET)', () => {
    return request(app.getHttpServer())
      .get('/heroes/1')
      .expect(200)
      .expect({
        id: 1,
        nombre: 'Nova',
        poder: 80,
        universo: 'A',
      });
  });

  it('/heroes/999 (GET) returns not found', () => {
    return request(app.getHttpServer()).get('/heroes/999').expect(404);
  });

  afterEach(async () => {
    await app.close();
  });
});
