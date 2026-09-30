import { Body, Controller, Get, Post } from '@nestjs/common';
import type { NuevoProducto } from './productos.service.js';
import { ProductosService } from './productos.service.js';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Get()
  findAll() {
    return this.productosService.findAll();
  }

  @Post()
  crear(@Body() producto: NuevoProducto) {
    return this.productosService.crear(producto);
  }
}