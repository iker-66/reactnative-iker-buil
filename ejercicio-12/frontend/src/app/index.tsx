import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000';

type Criatura = {
  id: number;
  nombre: string;
  nivel: number;
  poder: number;
  likes: number;
  emoji: string;
};

export default function HomeScreen() {
  const [criaturas, setCriaturas] = useState<Criatura[]>([]);
  const [seleccionada, setSeleccionada] = useState<Criatura | null>(null);
  const [id, setId] = useState('');
  const [cargandoLista, setCargandoLista] = useState(true);
  const [cargandoFicha, setCargandoFicha] = useState(false);
  const [dandoLike, setDandoLike] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recarga, setRecarga] = useState(0);

  useEffect(() => {
    let cancelado = false;

    async function cargarCriaturas() {
      setCargandoLista(true);
      setError(null);

      try {
        const respuesta = await fetch(`${API_URL}/criaturas`);
        if (!respuesta.ok) {
          throw new Error(`El servidor respondió ${respuesta.status}.`);
        }

        const datos = (await respuesta.json()) as Criatura[];
        if (!cancelado) {
          setCriaturas(datos);
        }
      } catch {
        if (!cancelado) {
          setError('No se pudieron cargar las criaturas. Comprueba la conexión.');
        }
      } finally {
        if (!cancelado) {
          setCargandoLista(false);
        }
      }
    }

    void cargarCriaturas();
    return () => {
      cancelado = true;
    };
  }, [recarga]);

  const seleccionarCriatura = async (idCriatura: number) => {
    setCargandoFicha(true);
    setError(null);

    try {
      const respuesta = await fetch(`${API_URL}/criaturas/${idCriatura}`);
      if (!respuesta.ok) {
        throw new Error(`No se encontró la criatura ${idCriatura}.`);
      }
      const criatura = (await respuesta.json()) as Criatura;
      setSeleccionada(criatura);
      setId(String(criatura.id));
    } catch (errorDeRed) {
      setError(
        errorDeRed instanceof Error
          ? errorDeRed.message
          : 'No se pudo cargar la ficha.',
      );
    } finally {
      setCargandoFicha(false);
    }
  };

  const buscarPorId = () => {
    const idNumerico = Number(id);
    if (!Number.isInteger(idNumerico) || idNumerico < 1) {
      setError('Introduce un ID entero mayor que cero.');
      return;
    }

    void seleccionarCriatura(idNumerico);
  };

  const darLike = async () => {
    if (!seleccionada) {
      return;
    }

    setDandoLike(true);
    setError(null);

    try {
      const respuesta = await fetch(
        `${API_URL}/criaturas/${seleccionada.id}/like`,
        { method: 'PATCH' },
      );
      if (!respuesta.ok) {
        throw new Error(`El servidor respondió ${respuesta.status}.`);
      }

      const actualizada = (await respuesta.json()) as Criatura;
      setSeleccionada(actualizada);
      setCriaturas((actuales) =>
        actuales.map((criatura) =>
          criatura.id === actualizada.id ? actualizada : criatura,
        ),
      );
    } catch (errorDeRed) {
      setError(
        errorDeRed instanceof Error
          ? errorDeRed.message
          : 'No se pudo actualizar el like.',
      );
    } finally {
      setDandoLike(false);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        data={criaturas}
        keyExtractor={(criatura) => String(criatura.id)}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <>
            <View style={styles.heading}>
              <View style={styles.headingMark}>
                <Text style={styles.headingMarkText}>CL</Text>
              </View>
              <View>
                <Text style={styles.eyebrow}>LABORATORIO · API EN VIVO</Text>
                <Text style={styles.title}>Creature Lab</Text>
              </View>
            </View>

            <Text style={styles.description}>
              Selecciona una criatura para consultar su ficha y darle un like.
            </Text>

            <View style={styles.searchRow}>
              <TextInput
                accessibilityLabel="Buscar criatura por ID"
                keyboardType="number-pad"
                onChangeText={setId}
                onSubmitEditing={buscarPorId}
                placeholder="Buscar por ID"
                returnKeyType="search"
                style={styles.input}
                value={id}
              />
              <Pressable
                accessibilityRole="button"
                disabled={cargandoFicha}
                onPress={buscarPorId}
                style={({ pressed }) => [
                  styles.searchButton,
                  pressed && styles.searchButtonPressed,
                  cargandoFicha && styles.buttonDisabled,
                ]}
              >
                {cargandoFicha ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.searchButtonText}>BUSCAR</Text>
                )}
              </Pressable>
            </View>

            {error ? (
              <Text accessibilityRole="alert" style={styles.error}>
                {error}
              </Text>
            ) : null}

            {seleccionada ? (
              <View style={styles.detailPanel}>
                <View style={styles.detailHeading}>
                  <Text style={styles.detailEyebrow}>FICHA · #{seleccionada.id}</Text>
                  <Text style={styles.level}>NIVEL {seleccionada.nivel}</Text>
                </View>
                <View style={styles.creatureIdentity}>
                  <Text style={styles.creatureEmoji}>{seleccionada.emoji}</Text>
                  <View style={styles.creatureInfo}>
                    <Text style={styles.creatureName}>{seleccionada.nombre}</Text>
                    <Text style={styles.powerText}>Poder {seleccionada.poder}</Text>
                  </View>
                  <View style={styles.likeBox}>
                    <Text style={styles.heart}>♥</Text>
                    <Text style={styles.likeNumber}>{seleccionada.likes}</Text>
                  </View>
                </View>
                <View style={styles.powerTrack}>
                  <View style={[styles.powerFill, { width: `${seleccionada.poder}%` }]} />
                </View>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`Dar like a ${seleccionada.nombre}`}
                  disabled={dandoLike}
                  onPress={darLike}
                  style={({ pressed }) => [
                    styles.likeButton,
                    pressed && styles.likeButtonPressed,
                    dandoLike && styles.buttonDisabled,
                  ]}
                >
                  {dandoLike ? (
                    <ActivityIndicator color="#17251C" />
                  ) : (
                    <Text style={styles.likeButtonText}>♥  ME GUSTA</Text>
                  )}
                </Pressable>
              </View>
            ) : (
              <View style={styles.prompt}>
                <Text style={styles.promptTitle}>Elige tu primera criatura</Text>
                <Text style={styles.promptText}>
                  Toca una fila o busca por su ID.
                </Text>
              </View>
            )}

            <View style={styles.catalogHeading}>
              <Text style={styles.catalogTitle}>Criaturas</Text>
              <Text style={styles.catalogCount}>{criaturas.length} registradas</Text>
            </View>
          </>
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            {cargandoLista ? (
              <ActivityIndicator color="#176B4A" />
            ) : (
              <Text style={styles.emptyText}>No hay criaturas para mostrar.</Text>
            )}
          </View>
        }
        renderItem={({ item }) => (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Seleccionar ${item.nombre}, nivel ${item.nivel}`}
            onPress={() => void seleccionarCriatura(item.id)}
            style={({ pressed }) => [
              styles.creatureRow,
              seleccionada?.id === item.id && styles.creatureRowSelected,
              pressed && styles.creatureRowPressed,
            ]}
          >
            <Text style={styles.rowEmoji}>{item.emoji}</Text>
            <View style={styles.rowInfo}>
              <Text style={styles.rowName}>{item.nombre}</Text>
              <Text style={styles.rowMeta}>NIVEL {item.nivel} · PODER {item.poder}</Text>
            </View>
            <Text style={styles.rowLikes}>♥ {item.likes}</Text>
          </Pressable>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListFooterComponent={
          <Text style={styles.endpoint}>
            GET /criaturas · GET /criaturas/:id · PATCH /criaturas/:id/like
          </Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F0F3E9',
  },
  listContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 32,
    alignSelf: 'center',
    width: '100%',
    maxWidth: 680,
  },
  heading: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
  },
  headingMark: {
    alignItems: 'center',
    backgroundColor: '#D8F06C',
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  headingMarkText: {
    color: '#23311D',
    fontSize: 15,
    fontWeight: '800',
  },
  eyebrow: {
    color: '#60734D',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  title: {
    color: '#1C281B',
    fontSize: 28,
    fontWeight: '700',
    marginTop: 3,
  },
  description: {
    color: '#5A6652',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 16,
    marginBottom: 18,
  },
  searchRow: {
    flexDirection: 'row',
    gap: 9,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderColor: '#D3DDC9',
    borderWidth: 1,
    flex: 1,
    fontSize: 15,
    minHeight: 48,
    paddingHorizontal: 12,
  },
  searchButton: {
    alignItems: 'center',
    backgroundColor: '#344B32',
    justifyContent: 'center',
    minWidth: 94,
    paddingHorizontal: 14,
  },
  searchButtonPressed: {
    backgroundColor: '#273B27',
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  detailPanel: {
    backgroundColor: '#FFFFFF',
    borderColor: '#D6E0C9',
    borderWidth: 1,
    marginTop: 18,
    padding: 16,
  },
  detailHeading: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailEyebrow: {
    color: '#68775C',
    fontSize: 10,
    fontWeight: '700',
  },
  level: {
    color: '#526646',
    fontSize: 10,
    fontWeight: '700',
  },
  creatureIdentity: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 14,
  },
  creatureEmoji: {
    fontSize: 42,
    height: 60,
    textAlign: 'center',
    textAlignVertical: 'center',
    width: 60,
  },
  creatureInfo: {
    flex: 1,
    marginLeft: 12,
  },
  creatureName: {
    color: '#1C281B',
    fontSize: 19,
    fontWeight: '700',
  },
  powerText: {
    color: '#60734D',
    fontSize: 13,
    marginTop: 4,
  },
  likeBox: {
    alignItems: 'center',
    backgroundColor: '#FBF0EA',
    minWidth: 54,
    paddingVertical: 7,
  },
  heart: {
    color: '#BE5248',
    fontSize: 17,
  },
  likeNumber: {
    color: '#293629',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 2,
  },
  powerTrack: {
    backgroundColor: '#E9EEDF',
    height: 6,
    marginTop: 12,
    overflow: 'hidden',
  },
  powerFill: {
    backgroundColor: '#88A64A',
    height: '100%',
  },
  likeButton: {
    alignItems: 'center',
    backgroundColor: '#D8F06C',
    justifyContent: 'center',
    minHeight: 44,
    marginTop: 14,
  },
  likeButtonPressed: {
    backgroundColor: '#C8E35A',
  },
  likeButtonText: {
    color: '#23311D',
    fontSize: 13,
    fontWeight: '800',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  prompt: {
    backgroundColor: '#E4EBDD',
    marginTop: 18,
    padding: 15,
  },
  promptTitle: {
    color: '#293629',
    fontSize: 15,
    fontWeight: '700',
  },
  promptText: {
    color: '#5A6652',
    fontSize: 13,
    marginTop: 4,
  },
  error: {
    color: '#A92D25',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 10,
  },
  catalogHeading: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 10,
  },
  catalogTitle: {
    color: '#1C281B',
    fontSize: 18,
    fontWeight: '700',
  },
  catalogCount: {
    color: '#68775C',
    fontSize: 12,
    fontWeight: '600',
  },
  creatureRow: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#DDE4D5',
    borderWidth: 1,
    flexDirection: 'row',
    minHeight: 70,
    paddingHorizontal: 12,
  },
  creatureRowSelected: {
    borderColor: '#879B55',
    backgroundColor: '#F8FBEF',
  },
  creatureRowPressed: {
    opacity: 0.75,
  },
  rowEmoji: {
    fontSize: 28,
    textAlign: 'center',
    width: 42,
  },
  rowInfo: {
    flex: 1,
    marginLeft: 8,
  },
  rowName: {
    color: '#293629',
    fontSize: 14,
    fontWeight: '700',
  },
  rowMeta: {
    color: '#718069',
    fontSize: 9,
    fontWeight: '700',
    marginTop: 4,
  },
  rowLikes: {
    color: '#A34B44',
    fontSize: 12,
    fontWeight: '700',
  },
  separator: {
    height: 8,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 90,
  },
  emptyText: {
    color: '#68775C',
    fontSize: 14,
  },
  endpoint: {
    color: '#77816D',
    fontFamily: 'monospace',
    fontSize: 10,
    lineHeight: 16,
    marginTop: 20,
  },
});
