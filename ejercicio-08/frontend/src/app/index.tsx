import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000';

type Producto = {
  id: number;
  nombre: string;
  precio: number;
  emoji: string;
};

export default function HomeScreen() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recarga, setRecarga] = useState(0);

  useEffect(() => {
    let cancelado = false;

    async function cargarProductos() {
      setCargando(true);
      setError(null);

      try {
        const respuesta = await fetch(`${API_URL}/productos`);
        if (!respuesta.ok) {
          throw new Error(`El servidor respondió ${respuesta.status}`);
        }

        const datos = (await respuesta.json()) as Producto[];
        if (!cancelado) {
          setProductos(datos);
        }
      } catch {
        if (!cancelado) {
          setError('No se pudo cargar el menú. Comprueba la conexión e inténtalo de nuevo.');
        }
      } finally {
        if (!cancelado) {
          setCargando(false);
        }
      }
    }

    void cargarProductos();
    return () => {
      cancelado = true;
    };
  }, [recarga]);

  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        data={productos}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={cargando}
            onRefresh={() => setRecarga((valor) => valor + 1)}
            tintColor="#176B4A"
          />
        }
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.eyebrow}>CASA VERDE · CARTA DEL DÍA</Text>
            <Text style={styles.title}>Menú del restaurante</Text>
            <Text style={styles.description}>
              Platos servidos desde NestJS, listos para elegir.
            </Text>
            <View style={styles.countRow}>
              <Text style={styles.count}>{productos.length}</Text>
              <Text style={styles.countLabel}>platos disponibles</Text>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Actualizar menú"
                disabled={cargando}
                onPress={() => setRecarga((valor) => valor + 1)}
                style={styles.refreshButton}
              >
                <Text style={styles.refreshText}>Actualizar</Text>
              </Pressable>
            </View>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            {cargando ? (
              <>
                <ActivityIndicator color="#176B4A" />
                <Text style={styles.emptyTitle}>Cargando el menú…</Text>
              </>
            ) : (
              <>
                <Text style={styles.emptyTitle}>No hay platos para mostrar</Text>
                {error ? <Text style={styles.error}>{error}</Text> : null}
              </>
            )}
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.productRow}>
            <View style={styles.productIcon}>
              <Text style={styles.emoji}>{item.emoji}</Text>
            </View>
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.nombre}</Text>
              <Text style={styles.productId}>PLATO {String(item.id).padStart(2, '0')}</Text>
            </View>
            <Text style={styles.price}>
              {item.precio.toLocaleString('es-ES', {
                style: 'currency',
                currency: 'EUR',
              })}
            </Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListFooterComponent={
          error && productos.length > 0 ? <Text style={styles.error}>{error}</Text> : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F3F5EF',
  },
  listContent: {
    flexGrow: 1,
    paddingHorizontal: 22,
    paddingBottom: 32,
    alignSelf: 'center',
    width: '100%',
    maxWidth: 620,
  },
  header: {
    paddingTop: 24,
    paddingBottom: 24,
  },
  eyebrow: {
    color: '#61704D',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  title: {
    color: '#20281B',
    fontSize: 30,
    fontWeight: '700',
    marginTop: 10,
  },
  description: {
    color: '#5A6352',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
  },
  countRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 22,
  },
  count: {
    color: '#176B4A',
    fontSize: 24,
    fontWeight: '700',
  },
  countLabel: {
    color: '#5A6352',
    fontSize: 13,
    marginLeft: 8,
  },
  refreshButton: {
    borderColor: '#C8D4C6',
    borderWidth: 1,
    marginLeft: 'auto',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  refreshText: {
    color: '#176B4A',
    fontSize: 13,
    fontWeight: '700',
  },
  productRow: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E0E5DA',
    borderWidth: 1,
    flexDirection: 'row',
    minHeight: 88,
    padding: 14,
  },
  productIcon: {
    alignItems: 'center',
    backgroundColor: '#F0F3E9',
    height: 56,
    justifyContent: 'center',
    width: 56,
  },
  emoji: {
    fontSize: 29,
  },
  productInfo: {
    flex: 1,
    marginLeft: 14,
  },
  productName: {
    color: '#20281B',
    fontSize: 16,
    fontWeight: '700',
  },
  productId: {
    color: '#78806D',
    fontSize: 10,
    fontWeight: '700',
    marginTop: 5,
  },
  price: {
    color: '#176B4A',
    fontSize: 15,
    fontWeight: '700',
  },
  separator: {
    height: 10,
  },
  emptyState: {
    alignItems: 'center',
    gap: 12,
    justifyContent: 'center',
    minHeight: 180,
  },
  emptyTitle: {
    color: '#354135',
    fontSize: 16,
    fontWeight: '600',
  },
  error: {
    color: '#A92D25',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 12,
  },
});
