# Ejercicio 06 · Estado de conexión

## Qué he aprendido

`useState` guarda en el componente una respuesta que cambia la interfaz. La app inicia desconectada, hace una petición HTTP y actualiza el estado cuando NestJS responde.

## Qué he modificado

- `backend/src/mensaje/mensaje.controller.ts` expone `GET /mensaje` y devuelve `{ "texto": "¡Conexión conseguida!" }`.
- `backend/src/main.ts` habilita CORS y escucha en el puerto 3000.
- `frontend/src/app/index.tsx` muestra el estado inicial, permite conectar y representa la respuesta o un error.
- La URL de la API se configura con `EXPO_PUBLIC_API_URL`.

## Respuesta de comprensión

`useState` no es una variable normal: al llamar a su función actualizadora, React vuelve a representar la interfaz con el valor nuevo. Una asignación normal no provoca ese renderizado.

## Ejecutar

1. En `backend/`, ejecuta `npm ci` y `npm run start:dev`.
2. Comprueba `http://localhost:3000/mensaje`; debe devolver el JSON con la propiedad `texto`.
3. En `frontend/`, ejecuta `npm ci` y configura `EXPO_PUBLIC_API_URL`.
4. Ejecuta `npx expo start` y pulsa **Conectar con el backend**.

Para web o un simulador local sirve `http://localhost:3000`. En un móvil físico, crea `frontend/.env.local` a partir de `.env.example` y sustituye `TU_IP_LOCAL` por la dirección IPv4 del ordenador; móvil y ordenador deben compartir red. Expo debe reiniciarse después de cambiar el archivo de entorno.

## Resultado

La pantalla muestra `Sin conectar` antes de pulsar y el mensaje del backend después de una respuesta correcta. Si falla la petición, mantiene el estado desconectado y ofrece un mensaje de error con opción para reintentar.

Validado con las pruebas unitarias y e2e del backend, `npm run build` y `npx tsc --noEmit` en el frontend.
