import { Controller, Get } from '@nestjs/common';

@Controller('mensaje')
export class MensajeController {
  @Get()
  obtenerMensaje(): { texto: string } {
    return { texto: '¡Conexión conseguida!' };
  }
}
