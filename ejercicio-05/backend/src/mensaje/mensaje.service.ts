import { Injectable } from '@nestjs/common';

@Injectable()
export class MensajeService {
	getMensaje(): string {
		return 'Mensaje desde el backend: conexion conseguida';
	}
}
