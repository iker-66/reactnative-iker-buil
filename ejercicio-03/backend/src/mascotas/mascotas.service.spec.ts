import { Test, TestingModule } from '@nestjs/testing';
import { MascotasService } from './mascotas.service.js';

describe('MascotasService', () => {
  let service: MascotasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MascotasService],
    }).compile();

    service = module.get<MascotasService>(MascotasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find a mascota by id', () => {
    expect(service.findOne(1)).toEqual({ id: 1, nombre: 'Luna' });
  });

  it('should return undefined when the id does not exist', () => {
    expect(service.findOne(99)).toBeUndefined();
  });
});
