// profile.js
import { View, Text, StyleSheet, Button } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// El componente ahora recibe { navigation } como prop para poder navegar
export default function Profile({ navigation }) { 
  return (
    <View style={styles.container}>
      <View style={styles.iconRow}>
        <Ionicons name="person-outline" size={28} color="green" />
        <Text style={styles.title}> Perfil de usuario </Text>
      </View>
      
      {/* Este botón navegará a la pantalla "Detalle" */}
      <Button
        title="Detalles de Usuario"
        onPress={() => navigation.navigate('Detalle')}
        color="green"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 20, // Espacio entre el texto y el botón
  },
  iconRow: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 10,
    color: 'green',
  },
});