import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

interface Jugador {
  id: number;
  nombre: string;
  apellido: string;
  edad: number;
  posicion: string;
  numero_casaca: number;
  equipo_id: number;
  nombre_equipo: string;
  goles: number;
  tarjetas_amarillas: number;
  tarjetas_rojas: number;
  asistencias: number;
}

const JugadoresScreen: React.FC = () => {
  const [jugador, setJugador] = useState<Jugador | null>(null);
  const [perfilImagen, setPerfilImagen] = useState<string | null>(null);

  useEffect(() => {
    obtenerJugadorId();
    cargarFotoPerfil();
    solicitarPermisoCamara();
  }, []);

  const obtenerJugadorId = async () => {
    try {
      const id = await AsyncStorage.getItem('jugador_id');
      if (id) {
        cargarDatosJugador(parseInt(id, 10));
      } else {
        Alert.alert('Error', 'No se encontró el ID del jugador');
      } 
    } catch (error) {
      console.error('Error al obtener el ID del jugador:', error);
    }
  };

  const cargarDatosJugador = async (jugadorId: number) => {
    try {
      const response = await fetch(`http://10.0.0.42/rn4/jugadores.php?jugador_id=${jugadorId}`);
      const data = await response.json();
      if (!data.error) {
        setJugador(data);
      } else {
        Alert.alert('Error', 'No se encontraron datos del jugador.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const cargarFotoPerfil = async () => {
    try {
      const foto = await AsyncStorage.getItem('perfilImagen');
      if (foto) {
        setPerfilImagen(foto);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const solicitarPermisoCamara = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Se necesita el permiso de cámara para tomar fotos.');
    }
  };

  const tomarFoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      allowsMultipleSelection: false,
    });

    if (!result.canceled && result.assets && result.assets[0]) {
      const uri = result.assets[0].uri;
      setPerfilImagen(uri);
      await AsyncStorage.setItem('perfilImagen', uri);
    }
  };

  return (
    <View style={styles.container}>
      {perfilImagen ? (
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: perfilImagen }} 
            style={styles.profileImage}
            resizeMode="cover"
          />
        </View>
      ) : (
        <View style={styles.placeholderImage}>
          <Text>Sin foto</Text>
        </View>
      )}
      
      <Button title="Tomar Foto" onPress={tomarFoto} />
      
      {jugador && (
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{jugador.nombre} {jugador.apellido}</Text>
          <Text style={styles.infoText}>Edad: {jugador.edad}</Text>
          <Text style={styles.infoText}>Posición: {jugador.posicion}</Text>
          <Text style={styles.infoText}>Número de Casaca: {jugador.numero_casaca}</Text>
          <Text style={styles.infoText}>Equipo: {jugador.nombre_equipo}</Text>
          <Text style={styles.infoText}>Goles: {jugador.goles}</Text>
          <Text style={styles.infoText}>Tarjetas Amarillas: {jugador.tarjetas_amarillas}</Text>
          <Text style={styles.infoText}>Tarjetas Rojas: {jugador.tarjetas_rojas}</Text>
          <Text style={styles.infoText}>Asistencias: {jugador.asistencias}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: 'hidden',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#ccc',
    backgroundColor: '#f0f0f0',
    marginTop: 50,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholderImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#ccc',
    overflow: 'hidden',
    marginTop: 50,
  },
  infoContainer: {
    width: '100%',
    marginTop: 20,
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    shadowColor: '#3c3c3c',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    textAlign: 'center',
  },
  infoText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#444',
  },
});

export default JugadoresScreen;
