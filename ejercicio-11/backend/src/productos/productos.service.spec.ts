import { BadRequestException } from '@nestjs/common';
import { ProductosService } from './productos.service.js';

describe('ProductosService', () => {
  it('creates a product and stores it in the array', () => {
    const service = new ProductosService();

    expect(service.crear({ nombre: '  Teclado  ', precio: 28.5 })).toEqual({
      id: 3,
      nombre: 'Teclado',
      precio: 28.5,
    });
    expect(service.findAll()).toHaveLength(3);
  });

  it('rejects an empty name or a non-positive price', () => {
    const service = new ProductosService();

    expect(() => service.crear({ nombre: ' ', precio: 10 })).toThrow(
      BadRequestException,
    );
    expect(() => service.crear({ nombre: 'Ratón', precio: 0 })).toThrow(
      BadRequestException,
    );
  });
});