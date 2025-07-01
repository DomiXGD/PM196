import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  ActivityIndicator,
  ScrollView,
  Switch,
} from "react-native";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [aceptaTerminos, setAceptaTerminos] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  const limpiarFormulario = () => {
    setNombre("");
    setEmail("");
    setAceptaTerminos(false);
  };

  const mostrarAlerta = () => {
    if (!nombre || !email) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
    } else if (!aceptaTerminos) {
      Alert.alert("Aviso", "Debes aceptar los Términos y Condiciones para continuar.");
    } else {
      Alert.alert("Registro exitoso", `Nombre: ${nombre}\nEmail: ${email}`, [
        { text: "OK", onPress: limpiarFormulario },
      ]);
    }
  };

  if (loading) {
    return (
      <View style={styles.splash}>
        <Text style={styles.splashtext}>Cargando...App</Text>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{ uri: "https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }}
        style={styles.background}
        resizeMode="cover"
      >
        <ScrollView contentContainerStyle={styles.overlay}>
          <Text style={styles.header}>Bienvenido a la app</Text>

          <View style={styles.formulario}>
            <Text style={styles.titulo}>Registro de Usuario</Text>

            <TextInput
              style={styles.input}
              placeholder="Nombre Completo"
              placeholderTextColor="#555"
              value={nombre}
              onChangeText={setNombre}
            />

            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#555"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <View style={styles.switchContainer}>
              <Switch
                value={aceptaTerminos}
                onValueChange={setAceptaTerminos}
                thumbColor={aceptaTerminos ? "#2196F3" : "#f4f3f4"}
              />
              <Text style={styles.switchText}>
                Acepto los Términos y Condiciones
              </Text>
            </View>

            <Button title="Registrar" onPress={mostrarAlerta} />
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    backgroundColor: "#2c3e50",
    alignItems: "center",
    justifyContent: "center",
  },
  splashtext: {
    color: "white",
    fontSize: 28,
    marginBottom: 20,
  },
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  overlay: {
    flexGrow: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 20,
    justifyContent: "center",
  },
  header: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  formulario: {
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: 20,
    borderRadius: 10,
  },
  titulo: {
    fontSize: 22,
    marginBottom: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    color: "#000",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  switchText: {
    marginLeft: 10,
    color: "#333",
    fontSize: 14,
    flex: 1,
  },
});
