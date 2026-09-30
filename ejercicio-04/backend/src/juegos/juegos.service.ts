import { Injectable } from '@nestjs/common';

@Injectable()
export class JuegosService {
  private readonly juegos = [
    { id: 1, titulo: 'Aventura espacial', genero: 'aventura' },
    { id: 2, titulo: 'Carrera urbana', genero: 'carreras' },
    { id: 3, titulo: 'Misterio nocturno', genero: 'aventura' },
    { id:4,titulo: 'resident evil',genero: 'terror'}
  ];

  findAll(genero?: string) {
    if (!genero) return this.juegos;
    return this.juegos.filter((juego) => juego.genero === genero);
  }
}