import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, Image, Dimensions } from 'react-native';

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

const anchoPantalla = Dimensions.get('window').width;

const TablaPosiciones = () => {
  const [equipos, setEquipos] = useState<Equipo[]>([]);

  useEffect(() => {
    const obtenerEquipos = async () => {
      try {
        const respuesta = await fetch('http://10.0.0.42/rn4/TablaPosiciones.php');
        const datos = await respuesta.json();

        // Filtra los equipos para excluir "New Team" y solo mantener los primeros 10 equipos
        const equiposFiltrados = datos.filter((equipo: Equipo) => equipo.nombre !== "New Team").slice(0, 10);
        
        setEquipos(equiposFiltrados);
      } catch (error) {
        console.error('Error al obtener los equipos:', error);
      }
    };

    obtenerEquipos();
  }, []);

  const renderizarEquipo = ({ item, index }: { item: Equipo; index: number }) => (
    <View style={[ 
      estilos.fila, 
      index % 2 === 0 ? estilos.filaPar : estilos.filaImpar, 
      index < 4 ? estilos.posicionesTop : null, 
      index > equipos.length - 4 ? estilos.posicionesAbajo : null 
    ]}>
      <View style={estilos.contenedorPosicion}>
        <Text style={[ 
          estilos.posicion, 
          index < 4 ? estilos.textoPosicionTop : null, 
          index > equipos.length - 4 ? estilos.textoPosicionAbajo : null 
        ]}>{item.id}</Text>
      </View>
      <View style={estilos.contenedorEquipo}>
        <Image 
          source={{ uri: item.escudo_url }} 
          style={estilos.logo}
          resizeMode="contain"
        />
        <Text style={estilos.nombre}>{item.nombre}</Text>
      </View>
      <Text style={estilos.puntos}>{item.puntos}</Text>
      <View style={estilos.contenedorEstadisticas}>
        <Text style={estilos.detalles}>{item.partidos_jugados}</Text>
        <Text style={estilos.detalles}>{item.partidos_ganados}</Text>
        <Text style={estilos.detalles}>{item.partidos_empatados}</Text>
        <Text style={estilos.detalles}>{item.partidos_perdidos}</Text>
      </View>
      <View style={estilos.contenedorGoles}>
        <Text style={estilos.detalles}>{item.goles_favor}</Text>
        <Text style={estilos.detalles}>{item.goles_contra}</Text>
        <Text style={[ 
          estilos.detalles, 
          item.diferencia_goles > 0 ? estilos.golesPositivos : 
          item.diferencia_goles < 0 ? estilos.golesNegativos : null 
        ]}>{item.diferencia_goles}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={estilos.contenedor}>
      <View style={estilos.tituloContenedor}>
        <Text style={estilos.titulo}>Tabla de Posiciones</Text>
      </View>

      <FlatList
        data={equipos}
        renderItem={renderizarEquipo}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => (
          <View style={estilos.encabezado}>
            <View style={estilos.contenedorPosicion}>
              <Text style={estilos.textoEncabezado}>Pos</Text>
            </View>
            <View style={estilos.contenedorEquipo}>
              <Text style={[estilos.textoEncabezado, estilos.encabezadoEquipo]}>Equipo</Text>
            </View>
            <Text style={[estilos.textoEncabezado, estilos.encabezadoPuntos]}>Pts</Text>
            <View style={estilos.contenedorEstadisticas}>
              <Text style={estilos.textoEncabezado}>PJ</Text>
              <Text style={estilos.textoEncabezado}>PG</Text>
              <Text style={estilos.textoEncabezado}>PE</Text>
              <Text style={estilos.textoEncabezado}>PP</Text>
            </View>
            <View style={estilos.contenedorGoles}>
              <Text style={estilos.textoEncabezado}>GF</Text>
              <Text style={estilos.textoEncabezado}>GC</Text>
              <Text style={estilos.textoEncabezado}>DG</Text>
            </View>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  tituloContenedor: {
    paddingVertical: 15,
    alignItems: 'center',
    backgroundColor: '#1a365d',
    marginBottom: 10,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 1,
  },
  encabezado: {
    flexDirection: 'row',
    backgroundColor: '#2c5282',
    paddingVertical: 12,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  textoEncabezado: {
    color: 'white',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
    flex: 1,
  },
  encabezadoEquipo: {
    textAlign: 'left',
    marginLeft: 50,
  },
  encabezadoPuntos: {
    width: 40,
  },
  fila: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  filaPar: {
    backgroundColor: 'white',
  },
  filaImpar: {
    backgroundColor: '#f7fafc',
  },
  posicionesTop: {
    backgroundColor: '#ebf8ff',
  },
  posicionesAbajo: {
    backgroundColor: '#fff5f5',
  },
  contenedorPosicion: {
    width: 30,
    alignItems: 'center',
  },
  posicion: {
    fontSize: 14,
    fontWeight: '500',
  },
  textoPosicionTop: {
    color: '#2b6cb0',
    fontWeight: '700',
  },
  textoPosicionAbajo: {
    color: '#c53030',
    fontWeight: '700',
  },
  contenedorEquipo: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  nombre: {
    fontSize: 14,
    flex: 1,
  },
  puntos: {
    width: 40,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 14,
  },
  contenedorEstadisticas: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 2,
  },
  contenedorGoles: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1.5,
  },
  detalles: {
    fontSize: 13,
    textAlign: 'center',
    color: '#4a5568',
  },
  golesPositivos: {
    color: '#2f855a',
    fontWeight: '600',
  },
  golesNegativos: {
    color: '#c53030',
    fontWeight: '600',
  },
});

export default TablaPosiciones;
