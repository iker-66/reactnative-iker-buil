import { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000';

type Heroe = {
  id: number;
  nombre: string;
  poder: number;
  universo: string;
};

export default function HomeScreen() {
  const [id, setId] = useState('1');
  const [heroe, setHeroe] = useState<Heroe | null>(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const buscarHeroe = async () => {
    const idNumerico = Number(id);
    if (!Number.isInteger(idNumerico) || idNumerico < 1) {
      setHeroe(null);
      setError('Escribe un ID entero mayor que cero.');
      return;
    }

    setCargando(true);
    setHeroe(null);
    setError(null);

    try {
      const respuesta = await fetch(`${API_URL}/heroes/${idNumerico}`);
      if (respuesta.status === 404) {
        throw new Error(`No existe un héroe con ID ${idNumerico}.`);
      }
      if (!respuesta.ok) {
        throw new Error(`El servidor respondió ${respuesta.status}.`);
      }

      setHeroe((await respuesta.json()) as Heroe);
    } catch (errorDeRed) {
      setError(
        errorDeRed instanceof Error
          ? errorDeRed.message
          : 'No se pudo contactar con NestJS.',
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}
      >
        <Text style={styles.eyebrow}>HÉROES · BÚSQUEDA POR ID</Text>
        <Text style={styles.title}>Busca un superhéroe</Text>
        <Text style={styles.description}>
          Introduce un identificador para consultar la ficha en NestJS.
        </Text>

        <View style={styles.searchPanel}>
          <Text style={styles.label}>ID DEL HÉROE</Text>
          <View style={styles.searchRow}>
            <TextInput
              accessibilityLabel="ID del héroe"
              keyboardType="number-pad"
              onChangeText={setId}
              onSubmitEditing={buscarHeroe}
              placeholder="Por ejemplo, 1"
              returnKeyType="search"
              style={styles.input}
              value={id}
            />
            <Pressable
              accessibilityRole="button"
              disabled={cargando}
              onPress={buscarHeroe}
              style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed,
                cargando && styles.buttonDisabled,
              ]}
            >
              {cargando ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.buttonText}>BUSCAR</Text>
              )}
            </Pressable>
          </View>
        </View>

        {error ? <Text accessibilityRole="alert" style={styles.error}>{error}</Text> : null}

        {heroe ? (
          <View style={styles.heroCard}>
            <View style={styles.heroTopline}>
              <Text style={styles.heroEyebrow}>FICHA · #{heroe.id}</Text>
              <Text style={styles.universe}>UNIVERSO {heroe.universo}</Text>
            </View>
            <Text style={styles.heroName}>{heroe.nombre}</Text>
            <View style={styles.powerRow}>
              <Text style={styles.powerLabel}>PODER</Text>
              <Text style={styles.powerValue}>{heroe.poder}</Text>
            </View>
            <View style={styles.powerTrack}>
              <View style={[styles.powerFill, { width: `${heroe.poder}%` }]} />
            </View>
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyMark}>?</Text>
            <Text style={styles.emptyTitle}>La ficha aparecerá aquí</Text>
            <Text style={styles.emptyHint}>Prueba los ID 1, 2 o 3.</Text>
          </View>
        )}

        <Text style={styles.endpoint}>GET /heroes/{'{id}'}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F2F5F1',
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
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
    fontSize: 31,
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
  searchPanel: {
    backgroundColor: '#FFFFFF',
    borderColor: '#DCE5DC',
    borderWidth: 1,
    padding: 18,
  },
  label: {
    color: '#53635A',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 9,
  },
  searchRow: {
    flexDirection: 'row',
    gap: 10,
  },
  input: {
    backgroundColor: '#F6F8F5',
    borderColor: '#DCE5DC',
    borderWidth: 1,
    flex: 1,
    fontSize: 16,
    minHeight: 50,
    paddingHorizontal: 12,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 38,
    paddingVertical: 28,
  },
  emptyMark: {
    alignItems: 'center',
    borderColor: '#C7D6CC',
    borderRadius: 28,
    borderWidth: 1,
    color: '#52705C',
    fontSize: 25,
    height: 56,
    lineHeight: 54,
    textAlign: 'center',
    width: 56,
  },
  emptyTitle: {
    color: '#26362A',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 14,
  },
  emptyHint: {
    color: '#708077',
    fontSize: 14,
    marginTop: 6,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#176B4A',
    justifyContent: 'center',
    minHeight: 50,
    minWidth: 104,
    paddingHorizontal: 15,
  },
  buttonPressed: {
    backgroundColor: '#11573C',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  heroCard: {
    backgroundColor: '#FFFFFF',
    borderColor: '#DCE5DC',
    borderWidth: 1,
    marginTop: 26,
    padding: 22,
  },
  heroTopline: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heroEyebrow: {
    color: '#708077',
    fontSize: 11,
    fontWeight: '700',
  },
  universe: {
    color: '#176B4A',
    fontSize: 11,
    fontWeight: '700',
  },
  heroName: {
    color: '#17251C',
    fontSize: 27,
    fontWeight: '700',
    marginTop: 22,
  },
  powerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  powerLabel: {
    color: '#53635A',
    fontSize: 12,
    fontWeight: '700',
  },
  powerValue: {
    color: '#176B4A',
    fontSize: 20,
    fontWeight: '700',
  },
  powerTrack: {
    backgroundColor: '#E7EEE7',
    height: 7,
    marginTop: 10,
    overflow: 'hidden',
  },
  powerFill: {
    backgroundColor: '#176B4A',
    height: '100%',
  },
  error: {
    color: '#A92D25',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 16,
  },
  endpoint: {
    color: '#708077',
    fontFamily: 'monospace',
    fontSize: 12,
    marginTop: 'auto',
    paddingTop: 32,
  },
});
