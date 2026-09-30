import { MensajeController } from './mensaje.controller.js';

describe('MensajeController', () => {
  const controller = new MensajeController();

  it('returns the connection text expected by the app', () => {
    expect(controller.obtenerMensaje()).toEqual({
      texto: '¡Conexión conseguida!',
    });
  });
});
