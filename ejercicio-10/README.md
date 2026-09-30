# Ejercicio 10 · Likes

## Qué he aprendido

`PATCH` modifica parcialmente un recurso existente. El servicio actualiza el array en memoria y devuelve la mascota modificada; al reiniciar NestJS el contador vuelve a su valor inicial.

## Qué he modificado

- `backend/src/mascotas/mascotas.service.ts` incrementa los likes de Toby.
- `backend/src/mascotas/mascotas.controller.ts` expone `PATCH /mascotas/:id/like` y responde 404 si no encuentra la mascota.
- `frontend/src/app/index.tsx` envía el PATCH y actualiza el contador con `mascota.likes` de la respuesta.

## Respuesta de comprensión

La app manda una petición `PATCH` porque quiere cambiar un dato existente, no reemplazar el recurso entero. Después lee el JSON que devuelve el backend y actualiza el estado; por eso la cifra visible coincide con el contador del servicio.

## Ejecutar

1. En `backend/`, ejecuta `npm ci` y `npm run start:dev`.
2. En `frontend/`, ejecuta `npm ci`, configura `EXPO_PUBLIC_API_URL` en `.env.local` para un móvil físico y ejecuta `npx expo start`.
3. Pulsa **ME GUSTA**. Cada respuesta actualizada reemplaza el número que muestra la pantalla.

En un móvil físico, usa la IPv4 del ordenador en `frontend/.env.local` y conecta ambos dispositivos a la misma red.

## Resultado

Toby empieza con 14 likes. Cada pulsación incrementa el array temporal del backend y la interfaz adopta el valor devuelto por `PATCH /mascotas/1/like`. Las pruebas unitarias y e2e verifican el incremento y el caso 404; también pasan el build de Nest y el chequeo TypeScript de Expo.
