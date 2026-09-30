import { Controller, Get } from '@nestjs/common';
import { MensajeService } from './mensaje.service.js';

@Controller('mensaje')
export class MensajeController {
	constructor(private readonly mensajeService: MensajeService) {}

	@Get()
	getMensaje(): string {
		return this.mensajeService.getMensaje();
	}
}
