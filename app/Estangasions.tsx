import { StyleSheet, TouchableOpacity, View, Text, Image, SafeAreaView, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import React, { useState, useEffect } from 'react';

const App = () => {
  const navigation = useNavigation();
  const [equipos, setEquipos] = useState([]);
  const [ubicacion, setUbicacion] = useState(null);
  const [error, setError] = useState(null);

  const irAPosiciones = () => navigation.navigate('TablaPosiciones');
  const irACalendario = () => navigation.navigate('Fixture');
  const irAEstadisticas = () => navigation.navigate('Estadisticas');

  useEffect(() => {
    const obtenerUbicacion = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permiso de ubicación denegado');
        return;
      }

      let localizacion = await Location.getCurrentPositionAsync({});
      let geocode = await Location.reverseGeocodeAsync({
        latitude: localizacion.coords.latitude,
        longitude: localizacion.coords.longitude
      });

      if (geocode.length > 0) {
        setUbicacion({
          ciudad: geocode[0].city || 'Ciudad desconocida',
          pais: geocode[0].country || 'País desconocido'
        });
      }
    };

    const obtenerEquipos = async () => {
      try {
        const respuesta = await fetch('http://10.0.0.42/rn4/DatosEquipo.php');
        const data = await respuesta.json();
        
        const topTeams = data.filter((team, index) => index < 10);
        setEquipos(topTeams);
      } catch (error) {
        console.error('Error al obtener equipos:', error);
      }
    };

    obtenerUbicacion();
    obtenerEquipos();
  }, []);

  const agruparEquipos = (equipos) => {
    const grupos = [];
    for (let i = 0; i < equipos.length; i += 2) {
      grupos.push(equipos.slice(i, i + 2));
    }
    return grupos;
  };

  const equiposAgrupados = agruparEquipos(equipos);

  return (
    <SafeAreaView style={estilos.contenedor}>
      <ScrollView>
        <View style={estilos.encabezado}>
          <Text style={estilos.titulo}>Inicio</Text>
          <View style={estilos.iconos}>
            <TouchableOpacity>
              <Feather name="search" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={estilos.iconoCampana}>
              <Feather name="bell" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={estilos.campeonCard}>
          <Text style={estilos.campeonTitulo}>Actual Campeón</Text>
          <Text style={estilos.campeonSubtitulo}>River Plate (2023)</Text>
          <Image source={require('/RN4/rn4/assets/images/img1.png')} style={estilos.imagenTrofeo} />
        </TouchableOpacity>

        <View style={estilos.seccion}>
          <Text style={estilos.seccionTitulo}>Categorías</Text>
          <View style={estilos.botones}>
            <TouchableOpacity style={estilos.boton} onPress={irAPosiciones}>
              <Text style={estilos.textoBoton}>Tabla de Posiciones</Text>
            </TouchableOpacity>
            <TouchableOpacity style={estilos.boton} onPress={irACalendario}>
              <Text style={estilos.textoBoton}>Fixture del Torneo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={estilos.boton} onPress={irAEstadisticas}>
              <Text style={estilos.textoBoton}>Estadísticas del Torneo</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={estilos.seccion}>
          <Text style={estilos.seccionTitulo}>Partidos Destacados</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {equiposAgrupados.map((grupo, index) => (
              <View key={index} style={estilos.grupoPartido}>
                <TouchableOpacity style={estilos.tarjetaPartido}>
                  <View style={estilos.equipoContenedor}>
                    <Image source={{ uri: grupo[0]?.escudo_url }} style={estilos.logoEquipo} />
                    <Text style={estilos.nombreEquipo}>{grupo[0]?.nombre}</Text>
                  </View>

                  <View style={estilos.infoPartido}>
                    <Text style={estilos.textoVs}>VS</Text>
                    {ubicacion && (
                      <View style={estilos.ubicacion}>
                        <Feather name="map-pin" size={16} color="white" />
                        <Text style={estilos.textoUbicacion}>{ubicacion.ciudad}, {ubicacion.pais}</Text>
                      </View>
                    )}
                  </View>

                  <View style={estilos.equipoContenedor}>
                    <Image source={{ uri: grupo[1]?.escudo_url }} style={estilos.logoEquipo} />
                    <Text style={estilos.nombreEquipo}>{grupo[1]?.nombre}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#1A1A3A'
  },
  encabezado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    paddingStart: 30,
    paddingTop: 40,
    backgroundColor: '#2A2A5A'
  },
  titulo: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  iconos: {
    flexDirection: 'row'
  },
  iconoCampana: {
    marginLeft: 16
  },
  campeonCard: {
    backgroundColor: '#2A2A5A',
    padding: 18,
    margin: 16,
    borderRadius: 16,
    alignItems: 'center'
  },
  campeonTitulo: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  campeonSubtitulo: {
    color: '#CCCCCC',
    fontSize: 16
  },
  imagenTrofeo: {
    width: 80,
    height: 120
  },
  seccion: {
    padding: 16
  },
  seccionTitulo: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  botones: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  boton: {
    backgroundColor: '#0052CC',
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 4
  },
  textoBoton: {
    color: 'white',
    textAlign: 'center'
  },
  grupoPartido: {
    flexDirection: 'row',
    marginRight: 12
  },
  tarjetaPartido: {
    backgroundColor: '#2A2A5A',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    width: 310,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 160,
  },
  equipoContenedor: {
    alignItems: 'center'
  },
  logoEquipo: {
    width: 76,
    height: 80
  },
  nombreEquipo: {
    color: 'white',
    fontSize: 14,
    marginTop: 6
  },
  infoPartido: {
    alignItems: 'center'
  },
  textoVs: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6
  },
  ubicacion: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6
  },
  textoUbicacion: {
    color: 'white',
    fontSize: 12
  }
});

export default App;