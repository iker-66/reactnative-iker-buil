import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { CriaturasService } from './criaturas.service.js';

@Controller('criaturas')
export class CriaturasController {
  constructor(private readonly criaturasService: CriaturasService) {}

  @Get()
  findAll() {
    return this.criaturasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    const criatura = this.criaturasService.findOne(id);
    if (!criatura) {
      throw new NotFoundException(`No existe una criatura con id ${id}`);
    }
    return criatura;
  }

  @Patch(':id/like')
  darLike(@Param('id', ParseIntPipe) id: number) {
    const criatura = this.criaturasService.darLike(id);
    if (!criatura) {
      throw new NotFoundException(`No existe una criatura con id ${id}`);
    }
    return criatura;
  }
}