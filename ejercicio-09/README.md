# Ejercicio 09 · Busca superhéroe

## Qué he aprendido

Un path param es un valor que forma parte de la ruta. React Native toma el ID del campo, construye `/heroes/{id}` y Nest lo recibe con `@Param()`.

## Qué he modificado

- `backend/src/heroes/heroes.service.ts` busca un héroe por ID en un array en memoria.
- `backend/src/heroes/heroes.controller.ts` expone `GET /heroes/:id`, valida que el ID sea entero y responde 404 si no existe.
- `frontend/src/app/index.tsx` permite escribir un ID y presenta nombre, poder y universo.

## Respuesta de comprensión

El ID deja de estar fijado en el código móvil. El usuario lo introduce, `fetch` lo añade a la ruta y Nest lo extrae con `@Param('id')` para que el servicio busque el objeto correspondiente.

## Ejecutar

1. En `backend/`, ejecuta `npm ci` y `npm run start:dev`.
2. Prueba `http://localhost:3000/heroes/1` (también existen los ID 2 y 3).
3. En `frontend/`, ejecuta `npm ci`, configura `EXPO_PUBLIC_API_URL` en `.env.local` para móvil físico y ejecuta `npx expo start`.
4. Escribe 1, 2 o 3 y pulsa **BUSCAR**. Un ID inexistente muestra el error 404.

## Resultado

El usuario decide qué héroe buscar y ve una ficha con nombre, poder y universo. Se validan el ID, la ruta correcta y el caso inexistente con pruebas unitarias y e2e; también pasan el build de Nest y el chequeo TypeScript de Expo.
