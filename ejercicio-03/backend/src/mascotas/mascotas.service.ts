import { Injectable } from '@nestjs/common';

@Injectable()
export class MascotasService {
  private readonly mascotas = [
    { id: 1, nombre: 'Luna' },
    { id: 2, nombre: 'Max' },
    {id:3 ,nombre: 'colie'}
  ];

  findOne(id: number) {
    return this.mascotas.find((mascota) => mascota.id === id);
  }
}