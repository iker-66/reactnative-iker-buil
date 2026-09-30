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

type Producto = {
  id: number;
  nombre: string;
  precio: number;
};

export default function HomeScreen() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
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
          throw new Error(`El servidor respondió ${respuesta.status}.`);
        }

        const datos = (await respuesta.json()) as Producto[];
        if (!cancelado) {
          setProductos(datos);
        }
      } catch {
        if (!cancelado) {
          setError('No se pudo cargar la tienda. Comprueba la conexión.');
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

  const crearProducto = async () => {
    const nombreLimpio = nombre.trim();
    const precioNumerico = Number(precio);
    if (!nombreLimpio || !Number.isFinite(precioNumerico) || precioNumerico <= 0) {
      setError('Escribe un nombre y un precio mayor que cero.');
      return;
    }

    setGuardando(true);
    setError(null);

    try {
      const respuesta = await fetch(`${API_URL}/productos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: nombreLimpio, precio: precioNumerico }),
      });
      if (!respuesta.ok) {
        throw new Error(`El servidor respondió ${respuesta.status}.`);
      }

      await respuesta.json();
      setNombre('');
      setPrecio('');
      setRecarga((valor) => valor + 1);
    } catch (errorDeRed) {
      setError(
        errorDeRed instanceof Error
          ? errorDeRed.message
          : 'No se pudo crear el producto.',
      );
    } finally {
      setGuardando(false);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        data={productos}
        keyExtractor={(producto) => String(producto.id)}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <>
            <Text style={styles.eyebrow}>TIENDA · CATÁLOGO EN VIVO</Text>
            <Text style={styles.title}>Mini tienda</Text>
            <Text style={styles.description}>
              Añade un producto y consúltalo en la lista.
            </Text>

            <View style={styles.form}>
              <Text style={styles.formTitle}>Nuevo producto</Text>
              <TextInput
                accessibilityLabel="Nombre del producto"
                autoCapitalize="words"
                onChangeText={setNombre}
                placeholder="Nombre"
                returnKeyType="next"
                style={styles.input}
                value={nombre}
              />
              <TextInput
                accessibilityLabel="Precio del producto"
                keyboardType="decimal-pad"
                onChangeText={setPrecio}
                onSubmitEditing={crearProducto}
                placeholder="Precio en euros"
                returnKeyType="done"
                style={styles.input}
                value={precio}
              />
              <Pressable
                accessibilityRole="button"
                disabled={guardando}
                onPress={crearProducto}
                style={({ pressed }) => [
                  styles.createButton,
                  pressed && styles.createButtonPressed,
                  guardando && styles.buttonDisabled,
                ]}
              >
                {guardando ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.createButtonText}>AÑADIR PRODUCTO</Text>
                )}
              </Pressable>
            </View>

            <View style={styles.catalogHeading}>
              <Text style={styles.catalogTitle}>Catálogo</Text>
              <Text style={styles.catalogCount}>{productos.length} productos</Text>
            </View>
            {error ? (
              <Text accessibilityRole="alert" style={styles.error}>
                {error}
              </Text>
            ) : null}
          </>
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            {cargando ? (
              <ActivityIndicator color="#176B4A" />
            ) : (
              <Text style={styles.emptyText}>Todavía no hay productos.</Text>
            )}
          </View>
        }
        renderItem={({ item, index }) => (
          <View style={styles.productRow}>
            <View style={styles.productIndex}>
              <Text style={styles.productIndexText}>{String(index + 1).padStart(2, '0')}</Text>
            </View>
            <Text style={styles.productName}>{item.nombre}</Text>
            <Text style={styles.productPrice}>
              {item.precio.toLocaleString('es-ES', {
                style: 'currency',
                currency: 'EUR',
              })}
            </Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListFooterComponent={<Text style={styles.endpoint}>GET + POST /productos</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F1F5F1',
  },
  listContent: {
    flexGrow: 1,
    paddingHorizontal: 22,
    paddingTop: 26,
    paddingBottom: 36,
    alignSelf: 'center',
    width: '100%',
    maxWidth: 620,
  },
  eyebrow: {
    color: '#58725A',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  title: {
    color: '#1E2B21',
    fontSize: 30,
    fontWeight: '700',
    marginTop: 12,
  },
  description: {
    color: '#5D695D',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 10,
    marginBottom: 22,
  },
  form: {
    backgroundColor: '#FFFFFF',
    borderColor: '#D9E3D8',
    borderWidth: 1,
    padding: 16,
  },
  formTitle: {
    color: '#1E2B21',
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#F8FAF7',
    borderColor: '#D9E3D8',
    borderWidth: 1,
    fontSize: 16,
    minHeight: 48,
    marginBottom: 10,
    paddingHorizontal: 12,
  },
  catalogHeading: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 28,
    marginBottom: 14,
  },
  catalogTitle: {
    color: '#1E2B21',
    fontSize: 20,
    fontWeight: '700',
  },
  catalogCount: {
    color: '#657463',
    fontSize: 13,
    fontWeight: '700',
  },
  createButton: {
    alignItems: 'center',
    backgroundColor: '#176B4A',
    justifyContent: 'center',
    minHeight: 50,
    marginTop: 4,
  },
  createButtonPressed: {
    backgroundColor: '#11573C',
  },
  buttonDisabled: {
    opacity: 0.65,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  productRow: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#DCE5DC',
    borderWidth: 1,
    flexDirection: 'row',
    minHeight: 72,
    paddingHorizontal: 14,
  },
  productIndex: {
    alignItems: 'center',
    backgroundColor: '#EDF3E9',
    height: 38,
    justifyContent: 'center',
    width: 38,
  },
  productIndexText: {
    color: '#547052',
    fontSize: 12,
    fontWeight: '700',
  },
  productName: {
    color: '#26362A',
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 12,
  },
  productPrice: {
    color: '#176B4A',
    fontSize: 15,
    fontWeight: '700',
  },
  separator: {
    height: 9,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  emptyText: {
    color: '#657463',
    fontSize: 14,
  },
  error: {
    color: '#A92D25',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 12,
  },
  endpoint: {
    color: '#718073',
    fontFamily: 'monospace',
    fontSize: 12,
    marginTop: 22,
  },
});
