import { Test, TestingModule } from '@nestjs/testing';
import { MensajeController } from './mensaje.controller.js';
import { MensajeService } from './mensaje.service.js';

describe('MensajeController', () => {
  let controller: MensajeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MensajeController],
      providers: [
        {
          provide: MensajeService,
          useValue: { getMensaje: () => 'Mensaje desde el backend' },
        },
      ],
    }).compile();

    controller = module.get<MensajeController>(MensajeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('returns the message from the service', () => {
    expect(controller.getMensaje()).toBe('Mensaje desde el backend');
  });
});
