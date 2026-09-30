import { Test, TestingModule } from '@nestjs/testing';
import { JuegosService } from './juegos.service.js';

describe('JuegosService', () => {
  let service: JuegosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JuegosService],
    }).compile();

    service = module.get<JuegosService>(JuegosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all games when no genre is provided', () => {
    expect(service.findAll()).toHaveLength(4);
  });

  it('should filter games by genre', () => {
    expect(service.findAll('aventura')).toEqual([
      { id: 1, titulo: 'Aventura espacial', genero: 'aventura' },
      { id: 3, titulo: 'Misterio nocturno', genero: 'aventura' },
    ]);
  });
});
