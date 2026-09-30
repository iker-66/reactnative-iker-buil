# Ejercicio 07 · Carga automática

## Qué he aprendido

`useEffect` permite iniciar una operación cuando aparece la pantalla. No reemplaza `fetch`: coordina el momento en que se ejecuta la petición. El array de dependencias vacío hace que el efecto se ejecute al montar; en esta solución, un contador permite repetirlo al pulsar recargar.

## Qué he modificado

- Se conserva `GET /mensaje` del ejercicio anterior en un backend independiente.
- `frontend/src/app/index.tsx` consulta el endpoint al montar, representa `Cargando…`, muestra el resultado y permite volver a cargarlo.
- La pantalla distingue los estados de carga, conexión y error; evita actualizar estado si la pantalla se desmonta mientras espera la respuesta.

## Respuesta de comprensión

Al llamar `cargarMensaje` desde un botón, la petición empieza solo después de una acción del usuario. Al llamarla desde `useEffect`, se inicia automáticamente cuando React monta la pantalla. El botón Recargar sigue disponible para repetir la petición.

## Ejecutar

1. En `backend/`, ejecuta `npm ci` y `npm run start:dev`.
2. Comprueba `http://localhost:3000/mensaje`.
3. En `frontend/`, ejecuta `npm ci`, configura `EXPO_PUBLIC_API_URL` en `.env.local` si usas un móvil físico y ejecuta `npx expo start`.
4. Al abrir la pantalla verás la carga automática; usa **Recargar mensaje** para repetirla.

En un teléfono físico sustituye `TU_IP_LOCAL` en `frontend/.env.local` por la IPv4 del ordenador. Ambos dispositivos deben compartir red.

## Resultado

La pantalla solicita el mensaje sin interacción inicial, presenta un estado de carga y ofrece recarga manual. La respuesta se verifica con la prueba e2e de `GET /mensaje` y el chequeo TypeScript del frontend.
