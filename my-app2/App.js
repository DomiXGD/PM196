import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import React,{useState} from 'react';


    const Texto= ({style})=>{
      const [contenido, setContenido]=useState('Hola Mundo')
      const actualizaTexto=()=>{setContenido('State Modificado')}
      return(
        <Text style={[styles.text,style]} onPress={actualizaTexto}> {contenido} </Text>
      )
    }

    // const Boton= ()=>{
    //   const [cambioNuevo,setContenidoo]=useState('Presioname')
    //   const actualizaBoton=()=>{setContenidoo('Ya me has presionado')}
    //   return(
    //     <Boton title={cambioNuevo} onPress={actualizaBoton}></Boton>
    //   )
    // }
    

export default function App() {
  return (

    <View style={styles.container}>

      <Texto style={styles.green}></Texto>
      <Texto style={styles.blue}></Texto>
      <Texto style={styles.gray}></Texto>
      {/* Quiero crear un boton que cuando lo pise se cambie el texto dentro del boton */}
      {/*    <Button 
      <Boton title='Pisame'> </Boton> */}
      <StatusBar style="auto" />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'stretch',
  },

  text:{
    color: 'red',
    fontSize: 27,
    width: 200,
    height: 50,
  },

  gray:{backgroundColor: 'gray', },
  blue:{backgroundColor: 'blue', },
  green:{backgroundColor: 'green',}
});
