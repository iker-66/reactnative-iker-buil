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

  it('/mascotas/1/like (PATCH)', () => {
    return request(app.getHttpServer())
      .patch('/mascotas/1/like')
      .expect(200)
      .expect({
        id: 1,
        nombre: 'Toby',
        likes: 15,
      });
  });

  it('/mascotas/999/like (PATCH) returns not found', () => {
    return request(app.getHttpServer()).patch('/mascotas/999/like').expect(404);
  });

  afterEach(async () => {
    await app.close();
  });
});
