import { CriaturasService } from './criaturas.service.js';

describe('CriaturasService', () => {
  it('lists the creatures', () => {
    expect(new CriaturasService().findAll()).toHaveLength(3);
  });

  it('finds a creature by id', () => {
    expect(new CriaturasService().findOne(2)?.nombre).toBe('Foxy');
  });

  it('increments likes on the selected creature', () => {
    expect(new CriaturasService().darLike(1)?.likes).toBe(28);
  });
});