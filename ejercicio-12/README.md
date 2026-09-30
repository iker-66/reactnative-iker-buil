# Ejercicio 12 · Creature Lab

## Qué he aprendido

La integración Full Stack completa el recorrido: React Native inicia `fetch`; NestJS recibe la ruta en el Controller; el Service consulta o modifica el array; la API devuelve JSON y React actualiza la interfaz con la respuesta.

## Qué he modificado

- `backend/src/criaturas/criaturas.service.ts` centraliza listado, búsqueda e incremento de likes en un array temporal.
- `backend/src/criaturas/criaturas.controller.ts` expone `GET /criaturas`, `GET /criaturas/:id` y `PATCH /criaturas/:id/like`.
- `frontend/src/app/index.tsx` combina carga del catálogo, búsqueda por ID, ficha de criatura y actualización de likes.
- La ficha y el elemento correspondiente de la lista se actualizan con el objeto devuelto por NestJS.

## Respuesta de comprensión

El listado se pide al montar la pantalla con `GET /criaturas`. Al seleccionar una criatura, la app envía su ID en `GET /criaturas/:id`; el Controller lo valida y llama al Service, que busca en el array. Al pulsar Me gusta, React Native envía `PATCH /criaturas/:id/like`; el Service incrementa el contador y devuelve la criatura actualizada. La app usa ese JSON para actualizar la ficha y el listado. El estado vive en memoria y vuelve al valor inicial al reiniciar NestJS.

## Ejecutar

1. En `backend/`, ejecuta `npm ci` y `npm run start:dev`.
2. Comprueba `http://localhost:3000/criaturas` y después `http://localhost:3000/criaturas/1`.
3. En `frontend/`, ejecuta `npm ci`, configura `EXPO_PUBLIC_API_URL` en `.env.local` para un móvil físico y ejecuta `npx expo start`.
4. Selecciona una fila o busca por ID; en la ficha, pulsa **ME GUSTA**.

Para un teléfono físico, configura la IPv4 del ordenador en `frontend/.env.local` y conecta ambos dispositivos a la misma red.

## Resultado

El catálogo, la ficha consultada por path param y la acción PATCH funcionan en una sola experiencia. Las pruebas unitarias y e2e cubren el recorrido del backend; también pasan el build de Nest y el chequeo TypeScript de Expo.
