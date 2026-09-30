import { HeroesService } from './heroes.service.js';

describe('HeroesService', () => {
  const service = new HeroesService();

  it('finds a hero by id', () => {
    expect(service.findOne(1)).toEqual({
      id: 1,
      nombre: 'Nova',
      poder: 80,
      universo: 'A',
    });
  });

  it('returns undefined when the id does not exist', () => {
    expect(service.findOne(999)).toBeUndefined();
  });
});