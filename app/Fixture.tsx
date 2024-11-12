import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';

interface Partido {
  equipo_local: string;
  equipo_visitante: string;
  goles_local: number;
  goles_visitante: number;
  fecha: string;
}

const Fixture = () => {
  const [partidos, setPartidos] = useState<{ [key: string]: Partido[] }>({});

  useEffect(() => {
    const obtenerPartidos = async () => {
      try {
        const respuesta = await fetch('http://10.0.0.42/rn4/Fixture.php');
        const datos = await respuesta.json();
        setPartidos(datos);
      } catch (error) {
        console.error('Error al obtener los partidos:', error);
      }
    };

    obtenerPartidos();
  }, []);

  const obtenerNumeroFecha = (fecha: string) => {
    return parseInt(fecha.match(/\d+/)?.[0] || '0');
  };

  return (
    <SafeAreaView style={estilos.contenedor}>
      <Text style={estilos.titulo}>Fixture del Torneo</Text>
      <ScrollView>
        {Object.keys(partidos)
          .sort((a, b) => obtenerNumeroFecha(a) - obtenerNumeroFecha(b))
          .map((fecha, index) => (
            <View key={index} style={estilos.contenedorFecha}>
              <View style={estilos.encabezadoFecha}>
                <Text style={estilos.tituloFecha}>Fecha {obtenerNumeroFecha(fecha)}</Text>
              </View>
              {partidos[fecha].map((partido, idx) => (
                <View key={idx} style={estilos.contenedorPartido}>
                  <View style={estilos.partido}>
                    <Text style={estilos.equipo}>{partido.equipo_local}</Text>
                    <View style={estilos.contenedorResultado}>
                      <Text style={[estilos.resultado, partido.goles_local !== null ? estilos.resultadoFinal : estilos.resultadoPendiente]}>
                        {partido.goles_local !== null ? partido.goles_local : '-'}
                      </Text>
                      <Text style={estilos.separador}>-</Text>
                      <Text style={[estilos.resultado, partido.goles_visitante !== null ? estilos.resultadoFinal : estilos.resultadoPendiente]}>
                        {partido.goles_visitante !== null ? partido.goles_visitante : '-'}
                      </Text>
                    </View>
                    <Text style={estilos.equipo}>{partido.equipo_visitante}</Text>
                  </View>
                </View>
              ))}
            </View>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a365d',
    textAlign: 'center',
    marginVertical: 15,
  },
  contenedorFecha: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
  },
  encabezadoFecha: {
    backgroundColor: '#2c5282',
    padding: 12,
  },
  tituloFecha: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  contenedorPartido: {
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  partido: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
  },
  equipo: {
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
    color: '#2d3748',
  },
  contenedorResultado: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
  },
  resultado: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    width: 30,
  },
  resultadoFinal: {
    color: '#2c5282',
  },
  resultadoPendiente: {
    color: '#a0aec0',
  },
  separador: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#a0aec0',
    marginHorizontal: 5,
  },
});

export default Fixture;
