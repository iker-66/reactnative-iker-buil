import { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000';

type MascotaResponse = {
  id: number;
  nombre: string;
  likes: number;
};

export default function HomeScreen() {
  const [likes, setLikes] = useState(14);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const darLike = async () => {
    setCargando(true);
    setError(null);

    try {
      const respuesta = await fetch(`${API_URL}/mascotas/1/like`, {
        method: 'PATCH',
      });
      if (!respuesta.ok) {
        throw new Error(`El servidor respondió ${respuesta.status}.`);
      }

      const mascota = (await respuesta.json()) as MascotaResponse;
      setLikes(mascota.likes);
    } catch (errorDeRed) {
      setError(
        errorDeRed instanceof Error
          ? errorDeRed.message
          : 'No se pudo registrar el like en NestJS.',
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.eyebrow}>EJERCICIO 10 · PATCH</Text>
        <Text style={styles.title}>Un like para Toby</Text>
        <Text style={styles.description}>
          La app envía una acción y NestJS devuelve el contador actualizado.
        </Text>

        <View style={styles.petCard}>
          <View style={styles.petArtwork}>
            <Text accessibilityLabel="Perro" style={styles.petEmoji}>🐶</Text>
          </View>
          <View style={styles.petDetails}>
            <Text style={styles.petName}>Toby</Text>
            <Text style={styles.petCaption}>AMIGO DE LA CASA</Text>
          </View>
          <View style={styles.likeCount}>
            <Text style={styles.heart}>♥</Text>
            <Text accessibilityLabel={`${likes} likes`} style={styles.likes}>
              {likes}
            </Text>
            <Text style={styles.likesLabel}>LIKES</Text>
          </View>
        </View>

        <View style={styles.actionSection}>
          <Text style={styles.sectionLabel}>APOYA A TOBY</Text>
          <Text style={styles.actionDescription}>
            Cada toque actualiza el contador guardado en el servicio.
          </Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Me gusta Toby"
            disabled={cargando}
            onPress={darLike}
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
              cargando && styles.buttonDisabled,
            ]}
          >
            {cargando ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>♥  ME GUSTA</Text>
            )}
          </Pressable>
          {error ? (
            <Text accessibilityRole="alert" style={styles.error}>
              {error}
            </Text>
          ) : null}
        </View>

        <View style={styles.flow}>
          <Text style={styles.flowLabel}>PETICIÓN</Text>
          <Text style={styles.flowValue}>PATCH /mascotas/1/like</Text>
          <Text style={styles.flowLabel}>RESPUESTA</Text>
          <Text style={styles.flowValue}>Toby · {likes} likes</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F7F1EF',
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
    color: '#8D5B57',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  title: {
    color: '#2C2423',
    fontSize: 31,
    fontWeight: '700',
    marginTop: 12,
  },
  description: {
    color: '#6C5B58',
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
  petCard: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#EADBD7',
    borderWidth: 1,
    flexDirection: 'row',
    marginTop: 12,
    padding: 16,
  },
  petArtwork: {
    alignItems: 'center',
    backgroundColor: '#F6E7E1',
    height: 72,
    justifyContent: 'center',
    width: 72,
  },
  petEmoji: {
    fontSize: 42,
  },
  petDetails: {
    flex: 1,
    marginLeft: 14,
  },
  petName: {
    color: '#2C2423',
    fontSize: 20,
    fontWeight: '700',
  },
  petCaption: {
    color: '#8D7771',
    fontSize: 10,
    fontWeight: '700',
    marginTop: 5,
  },
  likeCount: {
    alignItems: 'center',
  },
  heart: {
    color: '#C65350',
    fontSize: 22,
  },
  likes: {
    color: '#2C2423',
    fontSize: 20,
    fontWeight: '700',
  },
  likesLabel: {
    color: '#8D7771',
    fontSize: 9,
    fontWeight: '700',
    marginTop: 2,
  },
  actionSection: {
    marginTop: 34,
  },
  sectionLabel: {
    color: '#8D5B57',
    fontSize: 11,
    fontWeight: '700',
  },
  actionDescription: {
    color: '#6C5B58',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
    marginBottom: 18,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#B84948',
    justifyContent: 'center',
    minHeight: 54,
    paddingHorizontal: 18,
  },
  buttonPressed: {
    backgroundColor: '#9E3C3D',
  },
  buttonDisabled: {
    opacity: 0.65,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  flow: {
    borderTopColor: '#EADBD7',
    borderTopWidth: 1,
    marginTop: 32,
    paddingTop: 18,
  },
  flowLabel: {
    color: '#8D7771',
    fontSize: 10,
    fontWeight: '700',
    marginTop: 12,
  },
  flowValue: {
    color: '#493B39',
    fontFamily: 'monospace',
    fontSize: 12,
    marginTop: 5,
  },
});
