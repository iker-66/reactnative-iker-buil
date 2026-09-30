import { Injectable } from '@nestjs/common';

export type Mascota = {
  id: number;
  nombre: string;
  likes: number;
};

@Injectable()
export class MascotasService {
  private readonly mascotas: Mascota[] = [
    { id: 1, nombre: 'Toby', likes: 14 },
  ];

  darLike(id: number): Mascota | undefined {
    const mascota = this.mascotas.find((item) => item.id === id);
    if (!mascota) {
      return undefined;
    }

    mascota.likes += 1;
    return mascota;
  }
}