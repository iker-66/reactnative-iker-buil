import { BadRequestException, Injectable } from '@nestjs/common';

export type Producto = {
  id: number;
  nombre: string;
  precio: number;
};

export type NuevoProducto = {
  nombre: string;
  precio: number;
};

@Injectable()
export class ProductosService {
  private readonly productos: Producto[] = [
    { id: 1, nombre: 'Mochila', precio: 35 },
    { id: 2, nombre: 'Auriculares', precio: 49 },
  ];

  findAll(): Producto[] {
    return this.productos;
  }

  crear(producto: NuevoProducto): Producto {
    const nombre = producto.nombre.trim();
    if (!nombre || !Number.isFinite(producto.precio) || producto.precio <= 0) {
      throw new BadRequestException('El nombre y un precio positivo son obligatorios.');
    }

    const nuevo = {
      id: Math.max(0, ...this.productos.map((item) => item.id)) + 1,
      nombre,
      precio: producto.precio,
    };
    this.productos.push(nuevo);
    return nuevo;
  }
}