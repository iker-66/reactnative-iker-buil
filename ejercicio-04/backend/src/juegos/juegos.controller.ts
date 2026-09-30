import { Controller, Get, Query } from '@nestjs/common';
import { JuegosService } from './juegos.service.js';

@Controller('juegos')
export class JuegosController {
  constructor(private readonly juegosService: JuegosService) {}

  @Get()
  findAll(@Query('genero') genero?: string) {
    return this.juegosService.findAll(genero);
  }
}