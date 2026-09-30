# Ejercicio 11 · Mini tienda

## Qué he aprendido

Una petición `POST` envía datos nuevos al backend. `Content-Type: application/json` indica el formato y `@Body()` permite al controlador recibir el objeto enviado por React Native.

## Qué he modificado

- `backend/src/productos/productos.service.ts` conserva el catálogo en un array y añade productos con un ID nuevo.
- `backend/src/productos/productos.controller.ts` expone `GET /productos` y `POST /productos`.
- `frontend/src/app/index.tsx` carga el catálogo, recoge nombre y precio, envía JSON y vuelve a cargar la lista después de crear.
- El servicio rechaza nombres vacíos y precios no positivos.

## Respuesta de comprensión

El objeto nace en el formulario; `JSON.stringify` lo convierte en el cuerpo HTTP. NestJS interpreta el JSON y `@Body()` lo entrega al controlador, que lo pasa al servicio para guardarlo en el array. La app consulta después `GET /productos` para representar la lista actualizada.

## Ejecutar

1. En `backend/`, ejecuta `npm ci` y `npm run start:dev`.
2. En `frontend/`, ejecuta `npm ci`, configura `EXPO_PUBLIC_API_URL` en `.env.local` para un móvil físico y ejecuta `npx expo start`.
3. Introduce nombre y precio y pulsa **AÑADIR PRODUCTO**.

Los productos viven en memoria y se reinician al parar NestJS. Para un móvil físico, configura la IPv4 local del ordenador en `frontend/.env.local` y usa la misma red.

## Resultado

El producto se valida, se crea en el backend y aparece en el catálogo tras una nueva petición GET. Las pruebas unitarias y e2e cubren creación, listado y entradas inválidas; también pasan el build de Nest y el chequeo TypeScript de Expo.
