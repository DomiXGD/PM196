import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'; // 1. Importar Stack Navigator
import { Ionicons } from '@expo/vector-icons';

// Importa tus pantallas
import Home from './screens/home';
import Profile from './screens/profile';
import Settings from './screens/settings';
import Detalle from './screens/Detalles'; // 2. Importar la nueva pantalla de detalle

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// 3. Crear el componente del Stack Navigator para el flujo de Perfil
function ProfileStack() {
  return (
    <Stack.Navigator>
      {/* La primera pantalla es Perfil, se oculta el encabezado para que no se duplique */}
      <Stack.Screen 
        name="ProfileBase" 
        component={Profile} 
        options={{ headerShown: false }}
      />
      {/* La segunda pantalla es Detalle, esta sí mostrará un encabezado y el botón para regresar */}
      <Stack.Screen name="Detalle" component={Detalle} />
    </Stack.Navigator>
  );
}


export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName;
            
            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Profile') {
              iconName = 'person';
            } else if (route.name === 'Settings') {
              iconName = 'settings';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007BFF',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            paddingBottom: 5,
            height: 60,
          },
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        {/* 4. La pestaña Profile ahora carga el componente ProfileStack en lugar de solo Profile */}
        <Tab.Screen name="Profile" component={ProfileStack} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}