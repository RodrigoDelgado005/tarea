import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

interface Equipo {
  id: number;
  nombre: string;
  escudo_url: string;
  puntos: number;
  partidos_jugados: number;
  partidos_ganados: number;
  partidos_empatados: number;
  partidos_perdidos: number;
  goles_favor: number;
  goles_contra: number;
  diferencia_goles: number;
}

interface Jugador {
  id: number;
  nombre: string;
  apellido: string;
  edad: number;
  posicion: string;
  numero_casaca: number;
  equipo_id: number;
  goles: number;
  tarjetas_amarillas: number;
  tarjetas_rojas: number;
  asistencias: number;
}

interface Partido {
  id: number;
  equipo_local_id: number;
  equipo_visitante_id: number;
  goles_local: number;
  goles_visitante: number;
  fecha: string;
  lugar: string;
  estado: string;
  resultado: string;
}

interface JugadorAccess {
  id: number;
  jugador_id: number;
  nombre_completo: string;
  claveKyc: string;
}

interface Seguidor {
  id: number;
  UserName: string;
  UserEmail: string;
  UserPw: string;
}

const PantallaAdministrador = () => {
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [jugadores, setJugadores] = useState<Jugador[]>([]);
  const [partidos, setPartidos] = useState<Partido[]>([]);
  const [jugadoresAccess, setJugadoresAccess] = useState<JugadorAccess[]>([]);
  const [seguidores, setSeguidores] = useState<Seguidor[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [mostrarJugadores, setMostrarJugadores] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      const [
        equiposResponse,
        jugadoresResponse,
        partidosResponse,
        jugadoresAccessResponse,
        seguidoresResponse,
      ] = await Promise.all([
        axios.get('http://10.0.50.146/rn4/AbmlActions.php?action=fetchData&table=equipos'),
        axios.get('http://10.0.50.146/rn4/AbmlActions.php?action=fetchData&table=jugadores'),
        axios.get('http://10.0.50.146/rn4/AbmlActions.php?action=fetchData&table=partidos'),
        axios.get('http://10.0.50.146/rn4/AbmlActions.php?action=fetchData&table=jugadoresaccess'),
        axios.get('http://10.0.50.146/rn4/AbmlActions.php?action=fetchData&table=seguidores'),
      ]);

      setEquipos(equiposResponse.data);
      setJugadores(jugadoresResponse.data);
      setPartidos(partidosResponse.data);
      setJugadoresAccess(jugadoresAccessResponse.data);
      setSeguidores(seguidoresResponse.data);
      setCargando(false);
    } catch (error) {
      console.error("Error al obtener datos", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const insertarDatos = async (tabla: string, datos: any) => {
    try {
      await axios.post('http://10.0.0.42/rn4/AbmlActions.php?action=insertData', { tabla, datos });
      fetchData();
    } catch (error) {
      console.error("Error al insertar datos", error);
    }
  };

  const actualizarDatos = async (tabla: string, datos: any, id: number) => {
    try {
      await axios.post('http://10.0.50.146/rn4/AbmlActions.php?action=updateData', { tabla, datos, id });
      fetchData();
    } catch (error) {
      console.error("Error al actualizar datos", error);
    }
  };

  const eliminarDatos = async (tabla: string, id: number) => {
    try {
      await axios.post('http://10.0.50.146/rn4/AbmlActions.php?action=deleteData', { tabla, id });
      fetchData();
    } catch (error) {
      console.error("Error al eliminar datos", error);
    }
  };

  if (cargando) {
    return <Text style={styles.loadingText}>Cargando...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Administración Deportiva</Text>

      {/* Equipos */}
      <View style={styles.section}>
        <Text style={styles.subHeader}>Equipos</Text>
        {equipos.map(equipo => (
          <View key={equipo.id} style={styles.row}>
            <Image source={{ uri: equipo.escudo_url }} style={styles.image} />
            <View style={styles.infoContainer}>
              <Text style={styles.text}>{equipo.nombre}</Text>
              <Text style={styles.text}>Puntos: {equipo.puntos}</Text>
            </View>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.button} onPress={() => actualizarDatos('equipos', equipo, equipo.id)}>
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => eliminarDatos('equipos', equipo.id)}>
                <Text style={styles.buttonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      {/* Jugadores */}
      <View style={styles.section}>
        <Text style={styles.subHeader}>Jugadores</Text>
        <TouchableOpacity style={styles.expandButton} onPress={() => setMostrarJugadores(!mostrarJugadores)}>
          <Text style={styles.expandButtonText}>{mostrarJugadores ? 'Ocultar' : 'Mostrar'} Jugadores</Text>
        </TouchableOpacity>
        {mostrarJugadores && (
          <ScrollView>
            {jugadores.map(jugador => (
              <View key={jugador.id} style={styles.row}>
                <View style={styles.infoContainer}>
                  <Text style={styles.text}>{jugador.nombre} {jugador.apellido}</Text>
                  <Text style={styles.text}>Edad: {jugador.edad}</Text>
                  <Text style={styles.text}>Posición: {jugador.posicion}</Text>
                </View>
                <View style={styles.buttonsContainer}>
                  <TouchableOpacity style={styles.button} onPress={() => actualizarDatos('jugadores', jugador, jugador.id)}>
                    <Text style={styles.buttonText}>Editar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={() => eliminarDatos('jugadores', jugador.id)}>
                    <Text style={styles.buttonText}>Eliminar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        )}
      </View>

      {/* Partidos */}
      <View style={styles.section}>
        <Text style={styles.subHeader}>Partidos</Text>
        <ScrollView>
          {partidos.map(partido => (
            <View key={partido.id} style={styles.row}>
              <View style={styles.infoContainer}>
                <Text style={styles.text}>Local: {partido.equipo_local_id}</Text>
                <Text style={styles.text}>Visitante: {partido.equipo_visitante_id}</Text>
                <Text style={styles.text}>Resultado: {partido.goles_local} - {partido.goles_visitante}</Text>
              </View>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button} onPress={() => actualizarDatos('partidos', partido, partido.id)}>
                  <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => eliminarDatos('partidos', partido.id)}>
                  <Text style={styles.buttonText}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Acceso de Jugadores */}
      <View style={styles.section}>
        <Text style={styles.subHeader}>Acceso de Jugadores</Text>
        <ScrollView>
          {jugadoresAccess.map(jugadorAccess => (
            <View key={jugadorAccess.id} style={styles.row}>
              <View style={styles.infoContainer}>
                <Text style={styles.text}>{jugadorAccess.nombre_completo}</Text>
                <Text style={styles.text}>Clave KYC: {jugadorAccess.claveKyc}</Text>
              </View>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button} onPress={() => actualizarDatos('jugadoresaccess', jugadorAccess, jugadorAccess.id)}>
                  <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => eliminarDatos('jugadoresaccess', jugadorAccess.id)}>
                  <Text style={styles.buttonText}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Seguidores */}
      <View style={styles.section}>
        <Text style={styles.subHeader}>Seguidores</Text>
        <ScrollView>
          {seguidores.map(seguidor => (
            <View key={seguidor.id} style={styles.row}>
              <View style={styles.infoContainer}>
                <Text style={styles.text}>Nombre de Usuario: {seguidor.UserName}</Text>
                <Text style={styles.text}>Email: {seguidor.UserEmail}</Text>
                <Text style={styles.text}>Contraseña: {seguidor.UserPw}</Text>
              </View>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button} onPress={() => actualizarDatos('seguidores', seguidor, seguidor.id)}>
                  <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => eliminarDatos('seguidores', seguidor.id)}>
                  <Text style={styles.buttonText}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#1F1F1F',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4F8EF7',
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFFFFF',
  },
  section: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#2A2A2A',
    padding: 10,
    borderRadius: 10,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
  },
  text: {
    color: '#FFFFFF',
    marginBottom: 5,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#4F8EF7',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginLeft: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 14,
  },
  expandButton: {
    backgroundColor: '#4F8EF7',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  expandButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default PantallaAdministrador;