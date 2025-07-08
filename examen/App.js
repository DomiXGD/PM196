import React, { useState, useCallback, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  SafeAreaView,
  Keyboard,
  Dimensions,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

// --- ¡IMPORTANTE! ---
// Reemplaza esta cadena con tu propia clave de API de The Movie Database (v3 auth)
const API_KEY = '55ae426ab86b215e27dba35d7e553c4e';
const API_URL = 'https://api.themoviedb.org/3/search/movie';
const GENRE_URL = 'https://api.themoviedb.org/3/genre/movie/list';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const { width } = Dimensions.get('window');

// Habilitar LayoutAnimation para Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// --- Componente para la tarjeta de película con nuevo diseño ---
const MovieCard = ({ item, genres }) => {
  // Mapea los IDs de género a sus nombres y toma los primeros dos
  const movieGenres = item.genre_ids
    .map(id => genres[id])
    .filter(name => name) // Filtra en caso de que un ID no se encuentre
    .slice(0, 2)
    .join(' / ');

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: item.poster_path ? `${IMAGE_BASE_URL}${item.poster_path}` : 'https://placehold.co/500x750/222/FFF?text=No+Image' }}
        style={styles.poster}
      />
      <View style={styles.cardOverlay}>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        {/* Muestra los géneros si existen */}
        {movieGenres.length > 0 && (
            <Text style={styles.genreText} numberOfLines={1}>{movieGenres}</Text>
        )}
        <View style={styles.detailsContainer}>
            <Text style={styles.details}>
            {item.release_date ? item.release_date.substring(0, 4) : 'N/A'}
            </Text>
            <View style={styles.ratingContainer}>
            <FontAwesome name="star" size={16} color="#FFD700" />
            <Text style={styles.rating}>
                {item.vote_average ? item.vote_average.toFixed(1) : 'N/A'}
            </Text>
            </View>
        </View>
      </View>
    </View>
  );
};

export default function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState({}); // Estado para guardar los géneros
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchType, setSearchType] = useState('approximate');

  // --- INICIO DE LA MODIFICACIÓN ---
  // useEffect para cargar la lista de géneros una sola vez al iniciar la app
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const url = `${GENRE_URL}?api_key=${API_KEY}&language=es-MX`;
        const response = await fetch(url);
        const data = await response.json();
        // Convierte el array de géneros en un objeto para búsqueda fácil (id: nombre)
        const genreMap = {};
        data.genres.forEach(genre => {
          genreMap[genre.id] = genre.name;
        });
        setGenres(genreMap);
      } catch (e) {
        console.error("Error al cargar los géneros", e);
      }
    };
    fetchGenres();
  }, []); // El array vacío asegura que se ejecute solo una vez
  // --- FIN DE LA MODIFICACIÓN ---

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [movies]);

  const searchMovies = useCallback(async () => {
    if (!query.trim()) {
      setError('Por favor, ingresa el nombre de una película.');
      setMovies([]);
      return;
    }

    Keyboard.dismiss();
    setIsLoading(true);
    setError(null);
    setMovies([]);

    const timerPromise = new Promise(resolve => setTimeout(resolve, 4000));
    const fetchPromise = fetch(`${API_URL}?api_key=${API_KEY}&language=es-MX&query=${encodeURIComponent(query)}`)
      .then(response => response.json());

    try {
      const [data] = await Promise.all([fetchPromise, timerPromise]);

      if (data.results) {
        let filteredMovies = data.results;
        if (searchType === 'exact') {
          filteredMovies = data.results.filter(
            movie => movie.title.toLowerCase() === query.toLowerCase()
          );
        }
        
        filteredMovies = filteredMovies.filter(movie => movie.poster_path);

        if (filteredMovies.length === 0) {
          setError('No se encontraron películas. Intenta con otro nombre.');
        }
        setMovies(filteredMovies);
      } else {
        setError('No se encontraron resultados.');
      }
    } catch (e) {
      setError('Ocurrió un error al conectar con el servidor.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [query, searchType]);

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        !isLoading && <Text style={styles.emptyText}>Busca algo increíble ✨</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Cine-Finder</Text>
        </View>

        <View style={styles.searchSection}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Encuentra tu película..."
              placeholderTextColor="#888"
              value={query}
              onChangeText={setQuery}
            />
            <TouchableOpacity style={styles.searchButton} onPress={searchMovies}>
              <FontAwesome name="search" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.searchOptions}>
            <TouchableOpacity
              style={[styles.optionButton, searchType === 'approximate' && styles.optionButtonActive]}
              onPress={() => setSearchType('approximate')}>
              <Text style={[styles.optionText, searchType === 'approximate' && styles.optionTextActive]}>Aproximada</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.optionButton, searchType === 'exact' && styles.optionButtonActive]}
              onPress={() => setSearchType('exact')}>
              <Text style={[styles.optionText, searchType === 'exact' && styles.optionTextActive]}>Exacta</Text>
            </TouchableOpacity>
          </View>
        </View>

        {isLoading ? (
          <ActivityIndicator size="large" color="#00aaff" style={styles.loader} />
        ) : (
          <FlatList
            data={movies}
            // --- INICIO DE LA MODIFICACIÓN ---
            // Pasamos la lista de géneros a cada tarjeta
            renderItem={({ item }) => <MovieCard item={item} genres={genres} />}
            // --- FIN DE LA MODIFICACIÓN ---
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={renderEmptyComponent}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
          />
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101419', // Color de fondo principal
  },
  header: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  searchSection: {
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1c2128',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#30363d',
  },
  input: {
    flex: 1,
    color: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 16,
  },
  searchButton: {
    padding: 12,
  },
  searchOptions: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  optionButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#1c2128',
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#30363d',
  },
  optionButtonActive: {
    backgroundColor: '#00aaff',
    borderColor: '#00aaff',
  },
  optionText: {
    color: '#fff',
    fontWeight: '600',
  },
  optionTextActive: {
    color: '#fff',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  card: {
    width: width / 2 - 25,
    height: width * 0.7,
    borderRadius: 12,
    marginBottom: 20,
    backgroundColor: '#1c2128',
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: '#30363d',
  },
  poster: {
    width: '100%',
    height: '100%',
  },
  cardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(28, 33, 40, 0.8)',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#30363d',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  // --- INICIO DE LA MODIFICACIÓN ---
  // Estilo para el texto de los géneros
  genreText: {
    fontSize: 11,
    color: '#ccc',
    fontStyle: 'italic',
    marginBottom: 6,
  },
  // --- FIN DE LA MODIFICACIÓN ---
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  details: {
    fontSize: 12,
    color: '#ccc',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#101419',
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 5,
  },
  rating: {
    fontSize: 12,
    color: '#FFD700',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  emptyContainer: {
    flex: 1,
    height: width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: '#ff7b72',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600'
  },
  emptyText: {
    color: '#888',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  }
});
