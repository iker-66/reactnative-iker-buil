import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000';

type MensajeResponse = {
  texto: string;
};

export default function HomeScreen() {
  const [mensaje, setMensaje] = useState('Cargando…');
  const [conectado, setConectado] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recarga, setRecarga] = useState(0);

  useEffect(() => {
    let cancelado = false;

    async function cargarMensaje() {
      setCargando(true);
      setError(null);

      try {
        const respuesta = await fetch(`${API_URL}/mensaje`);
        if (!respuesta.ok) {
          throw new Error(`El servidor respondió ${respuesta.status}`);
        }

        const datos = (await respuesta.json()) as MensajeResponse;
        if (!cancelado) {
          setMensaje(datos.texto);
          setConectado(true);
        }
      } catch {
        if (!cancelado) {
          setMensaje('Sin conectar');
          setConectado(false);
          setError('No se pudo contactar con NestJS. Revisa la URL y vuelve a intentar.');
        }
      } finally {
        if (!cancelado) {
          setCargando(false);
        }
      }
    }

    void cargarMensaje();
    return () => {
      cancelado = true;
    };
  }, [recarga]);

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.content}>
        <Text style={styles.eyebrow}>EJERCICIO 06 · FULL STACK</Text>
        <Text style={styles.title}>Estado de conexión</Text>
        <Text style={styles.description}>
          Comprueba el recorrido entre la app y el endpoint de NestJS.
        </Text>

        <View style={styles.statusPanel}>
          <View style={styles.statusHeading}>
            <View
              accessibilityLabel={conectado ? 'Conectado' : 'Sin conectar'}
              style={[
                styles.dot,
                cargando
                  ? styles.dotLoading
                  : conectado
                    ? styles.dotOnline
                    : styles.dotOffline,
              ]}
            />
            <Text style={styles.statusLabel}>
              {cargando ? 'CARGANDO' : conectado ? 'CONECTADO' : 'SIN CONECTAR'}
            </Text>
          </View>
              {cargando ? (
                <View style={styles.loadingRow}>
                  <ActivityIndicator color="#176B4A" />
                  <Text style={styles.message}>Cargando…</Text>
                </View>
              ) : (
                <Text style={styles.message}>
                  {conectado ? `🟢 ${mensaje}` : `🔴 ${mensaje}`}
                </Text>
              )}
          <Text style={styles.endpoint}>GET /mensaje</Text>
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Pressable
          accessibilityRole="button"
          disabled={cargando}
          onPress={() => setRecarga((valor) => valor + 1)}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
            cargando && styles.buttonDisabled,
          ]}
        >
          {cargando ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>
              {conectado ? 'Recargar mensaje' : 'Reintentar conexión'}
            </Text>
          )}
        </Pressable>

        <Text style={styles.note}>API · {API_URL}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F2F5F1',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    alignSelf: 'center',
    width: '100%',
    maxWidth: 560,
  },
  eyebrow: {
    color: '#52705C',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  title: {
    color: '#17251C',
    fontSize: 32,
    fontWeight: '700',
    marginTop: 12,
  },
  description: {
    color: '#53635A',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 10,
    marginBottom: 28,
  },
  statusPanel: {
    backgroundColor: '#FFFFFF',
    borderColor: '#DCE5DC',
    borderWidth: 1,
    padding: 22,
  },
  statusHeading: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 9,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  dotOffline: {
    backgroundColor: '#CE493D',
  },
  dotLoading: {
    backgroundColor: '#D99A32',
  },
  dotOnline: {
    backgroundColor: '#198653',
  },
  statusLabel: {
    color: '#53635A',
    fontSize: 12,
    fontWeight: '700',
  },
  loadingRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    marginTop: 18,
  },
  message: {
    color: '#17251C',
    fontSize: 20,
    fontWeight: '600',
  },
  endpoint: {
    color: '#708077',
    fontFamily: 'monospace',
    fontSize: 13,
    marginTop: 14,
  },
  error: {
    color: '#A92D25',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 14,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#176B4A',
    justifyContent: 'center',
    minHeight: 52,
    marginTop: 20,
    paddingHorizontal: 18,
  },
  buttonPressed: {
    backgroundColor: '#11573C',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  note: {
    color: '#708077',
    fontSize: 12,
    marginTop: 16,
  },
});
