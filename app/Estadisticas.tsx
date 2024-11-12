import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';

interface Jugador {
  nombre: string;
  apellido: string;
  posicion: string;
  goles?: number;
  asistencias?: number;
  tarjetas_amarillas?: number;
  tarjetas_rojas?: number;
  equipo: string;
}

const Estadisticas = () => {
  const [goleadores, setGoleadores] = useState<Jugador[]>([]);
  const [asistentes, setAsistentes] = useState<Jugador[]>([]);
  const [tarjetasAmarillas, setTarjetasAmarillas] = useState<Jugador[]>([]);
  const [tarjetasRojas, setTarjetasRojas] = useState<Jugador[]>([]);

  useEffect(() => {
    const fetchTops = async () => {
      try {
        const response = await fetch('http://10.0.0.42/rn4/Tops.php');
        const data = await response.json();
        
        setGoleadores(data.goleadores);
        setAsistentes(data.asistencias);
        setTarjetasAmarillas(data.tarjetas_amarillas);
        setTarjetasRojas(data.tarjetas_rojas);
      } catch (error) {
        console.error('Error al obtener las estadísticas:', error);
      }
    };

    fetchTops();
  }, []);

  const renderTop = (titulo: string, jugadores: Jugador[], tipo: string) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{titulo}</Text>
      {jugadores.map((jugador, index) => (
        <View key={index} style={styles.jugadorRow}>
          <Text style={styles.jugadorText}>{`${index + 1}. ${jugador.nombre} ${jugador.apellido}`}</Text>
          <Text style={styles.jugadorText}>{jugador.equipo}</Text>
          <Text style={styles.jugadorText}>{jugador.posicion}</Text>
          <Text style={styles.jugadorText}>{jugador[tipo]}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {renderTop('Top 5 Goleadores', goleadores, 'goles')}
        {renderTop('Top 5 Asistentes', asistentes, 'asistencias')}
        {renderTop('Top 5 Tarjetas Amarillas', tarjetasAmarillas, 'tarjetas_amarillas')}
        {renderTop('Top 5 Tarjetas Rojas', tarjetasRojas, 'tarjetas_rojas')}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  section: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#E6E6E6',
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  jugadorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 5,
  },
  jugadorText: {
    flex: 1,
    fontSize: 14,
    textAlign: 'center',
  },
});

export default Estadisticas;
