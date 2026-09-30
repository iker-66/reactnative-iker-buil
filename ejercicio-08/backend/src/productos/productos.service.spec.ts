import { ProductosService } from './productos.service.js';

describe('ProductosService', () => {
  it('returns four products, including the added salad', () => {
    const service = new ProductosService();

    expect(service.findAll()).toHaveLength(4);
    expect(service.findAll()[3]).toMatchObject({
      id: 4,
      nombre: 'Ensalada',
    });
  });
});