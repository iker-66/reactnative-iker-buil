import { Injectable } from '@nestjs/common';

export type Producto = {
  id: number;
  nombre: string;
  precio: number;
  emoji: string;
};

@Injectable()
export class ProductosService {
  private readonly productos: Producto[] = [
    { id: 1, nombre: 'Burger', precio: 9.95, emoji: '🍔' },
    { id: 2, nombre: 'Pizza', precio: 11.5, emoji: '🍕' },
    { id: 3, nombre: 'Taco', precio: 7.5, emoji: '🌮' },
    { id: 4, nombre: 'Ensalada', precio: 6.5, emoji: '🥗' },
  ];

  findAll(): Producto[] {
    return this.productos;
  }
}