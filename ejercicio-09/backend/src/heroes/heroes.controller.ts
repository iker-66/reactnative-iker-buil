import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { HeroesService } from './heroes.service.js';

@Controller('heroes')
export class HeroesController {
  constructor(private readonly heroesService: HeroesService) {}

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    const heroe = this.heroesService.findOne(id);
    if (!heroe) {
      throw new NotFoundException(`No existe un héroe con id ${id}`);
    }
    return heroe;
  }
}