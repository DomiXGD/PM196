import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  SafeAreaView,
  Platform,
} from "react-native";

const App = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telefono, setTelefono] = useState("");

  const limpiarFormulario = () => {
    setNombre("");
    setEmail("");
    setPassword("");
    setTelefono("");
  };

  const mostrarAlerta = () => {
    if (!nombre || !email || !password) {
      if (Platform.OS === "web") {
        window.alert("Por favor, completa todos los campos.");
      } else {
        Alert.alert("Error", "Por favor, completa todos los campos.", [
          { text: "OK" },
        ]);
      }
    } else {
      if (Platform.OS === "web") {
        window.alert(
          `Registro exitoso\nNombre: ${nombre}\nEmail: ${email}\nPassword: ${password}`
        );
        limpiarFormulario();
      } else {
        Alert.alert(
          "Registro exitoso",
          `Nombre: ${nombre}\nEmail: ${email}`,
          [{ text: "OK", onPress: () => limpiarFormulario() }]
        );
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formulario}>
        <Text style={styles.titulo}>Registro de usuario</Text>

        <TextInput
          style={styles.input}
          placeholder="Nombre Completo"
          value={nombre}
          onChangeText={setNombre}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TextInput
          style={styles.input}
          placeholder="Teléfono"
          value={telefono}
          onChangeText={setTelefono}
          keyboardType="phone-pad"
        />

        <Button title="Registrarse" onPress={mostrarAlerta} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  formulario: {
    backgroundColor: "#f5f5f5",
    padding: 20,
    borderRadius: 10,
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1, // <- Corregido aquí
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "white",
  },
});

export default App;
