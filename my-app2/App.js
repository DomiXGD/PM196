import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image } from 'react-native';


    const Texto= (props)=>{
      const {contenido}=props
      return(
        <Text> {contenido} </Text>
      )
    }

export default function App() {
  return (

    <View style={styles.container}>

      <Texto contenido="hola"></Texto>
      <Texto contenido="mundo"></Texto>
      <Texto contenido="React Native"></Texto>

      <Button title='Presioname'> </Button>
      <StatusBar style="auto" />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
