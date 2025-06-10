import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image } from 'react-native';


    const Texto= ()=>{
      return(
        <Text> Hola que tal </Text>
      )
    }

export default function App() {
  return (

    <View style={styles.container}>

      <Text>Holaaaaa</Text>
      <Texto />
      <Texto />
      <Texto />
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
