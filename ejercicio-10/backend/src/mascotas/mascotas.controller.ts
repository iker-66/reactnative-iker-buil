import {
  Controller,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { MascotasService } from './mascotas.service.js';

@Controller('mascotas')
export class MascotasController {
  constructor(private readonly mascotasService: MascotasService) {}

  @Patch(':id/like')
  darLike(@Param('id', ParseIntPipe) id: number) {
    const mascota = this.mascotasService.darLike(id);
    if (!mascota) {
      throw new NotFoundException(`No existe una mascota con id ${id}`);
    }
    return mascota;
  }
}