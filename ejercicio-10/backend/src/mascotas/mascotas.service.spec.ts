import { MascotasService } from './mascotas.service.js';

describe('MascotasService', () => {
  it('increments and returns the updated likes', () => {
    const service = new MascotasService();

    expect(service.darLike(1)).toEqual({
      id: 1,
      nombre: 'Toby',
      likes: 15,
    });
  });

  it('returns undefined for an unknown pet', () => {
    expect(new MascotasService().darLike(999)).toBeUndefined();
  });
});