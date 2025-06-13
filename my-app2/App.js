import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image } from 'react-native';


    const Texto= (props)=>{
      const {children}=props
      return(
        <Text> {children} </Text>
      )
    }

export default function App() {
  return (

    <View style={styles.container}>

      <Texto>"hola"</Texto>
      <Texto>"Mundo"</Texto>
      <Texto>React Native</Texto>

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
