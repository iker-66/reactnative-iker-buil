import { Injectable } from "@nestjs/common";

@Injectable()
export class PizzasService {
  private pizzas = [
    { id: 1, nombre: 'Margarita', precio: 9 },
    { id: 2, nombre: 'Pepperoni', precio: 11 },
    { id: 3, nombre: 'serrana🚀', precio:13}
  ];
  findAll() { return this.pizzas; }
}