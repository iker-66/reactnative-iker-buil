import { Injectable } from '@nestjs/common';

export type Heroe = {
  id: number;
  nombre: string;
  poder: number;
  universo: string;
};

@Injectable()
export class HeroesService {
  private readonly heroes: Heroe[] = [
    { id: 1, nombre: 'Nova', poder: 80, universo: 'A' },
    { id: 2, nombre: 'Titan', poder: 95, universo: 'B' },
    { id: 3, nombre: 'Volt', poder: 88, universo: 'A' },
  ];

  findOne(id: number): Heroe | undefined {
    return this.heroes.find((heroe) => heroe.id === id);
  }
}