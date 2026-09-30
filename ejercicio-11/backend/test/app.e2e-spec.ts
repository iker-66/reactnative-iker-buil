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

  it('/productos (GET)', () => {
    return request(app.getHttpServer())
      .get('/productos')
      .expect(200)
      .expect((response) => expect(response.body).toHaveLength(2));
  });

  it('/productos (POST) creates a product from the JSON body', () => {
    return request(app.getHttpServer())
      .post('/productos')
      .send({ nombre: 'Teclado', precio: 28.5 })
      .expect(201)
      .expect({ id: 3, nombre: 'Teclado', precio: 28.5 });
  });

  it('/productos (POST) rejects invalid values', () => {
    return request(app.getHttpServer())
      .post('/productos')
      .send({ nombre: ' ', precio: 0 })
      .expect(400);
  });

  afterEach(async () => {
    await app.close();
  });
});
