import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert, Platform } from 'react-native';
import React,{useState} from 'react';


/*     const Texto= ({style})=>{
      const [contenido, setContenido]=useState('Hola Mundo')
      const actualizaTexto=()=>{setContenido('State Modificado')}
      return(
        <Text style={[styles.text,style]} onPress={actualizaTexto}> {contenido} </Text>
      )
    } */

      const showAlert = (message) =>{
        if (Platform.OS === 'web'){
          window.alert(message);
        }else{
          Alert.alert('Alert', message)
        }
      }
    

export default function App() {
  return (

    <View style={styles.container}>
      <Text style={styles.title}>React Native Button Test</Text>
      
      <View style={styles.section}>
        <Text style={styles.description}>Boton Básico</Text>
        <Button
          title='Presioname'
          onPress={() => showAlert('Boton presionado')}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.description}>Boton con color:</Text>
        <Button
          title='Boton de color'
          color="#f194ff"
          onPress={() => showAlert('Boton de color presionado')}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.description}>Boton deshabilitado:</Text>
        <Button
          title='Boton deshabilitado'
          disabled
          onPress={() => showAlert('Boton de color presionado')}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.description}>Dos botones</Text>
        <View style={styles.buttonRow}>
          <Button
            title='Izquierda'
            onPress={() => showAlert('Boton Izquierdo presionado')}
          />
          <View style={styles.buttonSpacer}/>
          <Button
            title='Derecha'
            onPress={() => showAlert('Boton Der echo presionado')}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    justifyContent: 'Center',
  },

  title:{
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#000000'
  },

  section:{
    marginBottom: 20
  },

  description:{
    fontSize: 16,
    marginBottom: 10,
    color: '#333333'
  },

  buttonRow:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  buttonSpacer:{
    width:10
  }
});
