# Ejercicio 08 · Menú del restaurante

## Qué he aprendido

`FlatList` representa colecciones en React Native. No hace la petición: `fetch` obtiene los datos, `useState` los conserva y `FlatList` pinta una fila por elemento.

## Qué he modificado

- `backend/src/productos/productos.service.ts` mantiene un array en memoria con cuatro platos.
- `backend/src/productos/productos.controller.ts` expone `GET /productos` y delega la lectura al servicio.
- `frontend/src/app/index.tsx` carga el endpoint y representa nombre, emoji y precio en tarjetas con `FlatList`.
- Se añadió Ensalada como cuarto producto y controles de carga, error y actualización.

## Respuesta de comprensión

El array del servicio es la fuente de datos del backend. La respuesta JSON llega a `productos` mediante `fetch` y `setProductos`; después `data={productos}` entrega ese array a `FlatList`, que crea una tarjeta por producto usando su `id` como clave.

## Ejecutar

1. En `backend/`, ejecuta `npm ci` y `npm run start:dev`.
2. Comprueba `http://localhost:3000/productos`.
3. En `frontend/`, ejecuta `npm ci`, configura `EXPO_PUBLIC_API_URL` en `.env.local` cuando uses un móvil físico y ejecuta `npx expo start`.

En un móvil físico, configura la IPv4 del ordenador en `frontend/.env.local`; ambos dispositivos deben estar en la misma red.

## Resultado

La pantalla muestra el menú recibido del endpoint como cuatro tarjetas. Las pruebas unitarias y e2e verifican el array y `GET /productos`; también pasan el build de Nest y el chequeo TypeScript de Expo.
