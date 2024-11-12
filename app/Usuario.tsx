import { StyleSheet, TouchableOpacity, View, Text, Image, ImageBackground, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function PantallaUsuarios() {
  const navegacion = useNavigation();

  return (
    <SafeAreaView style={estilos.areaSegura}>
      <ImageBackground
        source={require('/RN4/rn4/assets/images/background.jpg')}
        style={estilos.imagenFondo}
        resizeMode="cover"
      >
        <View style={estilos.contenedor}>
          <View style={estilos.contenedorContenido}>
            <Text style={estilos.tituloTexto}>¡Bienvenido! Selecciona tu perfil</Text>
            <View style={estilos.contenedorBotones}>
              <TouchableOpacity style={[estilos.boton, estilos.botonAdmin]} onPress={() => navegacion.navigate('Administrador')}>
                <Text style={estilos.textoBoton}>Administrador</Text>
                <Image source={require('/RN4/rn4/assets/images/traje.png')} style={estilos.iconoBoton} />
              </TouchableOpacity>
              <TouchableOpacity style={[estilos.boton, estilos.botonJugador]} onPress={() => navegacion.navigate('Jugadores')}>
                <Text style={estilos.textoBoton}>Jugadores</Text>
                <Image source={require('/RN4/rn4/assets/images/jugador.png')} style={estilos.iconoBoton} />
              </TouchableOpacity>
              <TouchableOpacity style={[estilos.boton, estilos.botonSeguidor]} onPress={() => navegacion.navigate('Seguidor')}>
                <Text style={estilos.textoBoton}>Seguidor</Text>
                <Image source={require('/RN4/rn4/assets/images/fans.png')} style={estilos.iconoBoton} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  areaSegura: {
    flex: 1,
  },
  imagenFondo: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  contenedor: {
    flex: 1,
    backgroundColor: 'rgba(0, 52, 102, 0.7)', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  contenedorContenido: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  tituloTexto: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    marginBottom: 40,
    fontWeight: '600',
    fontFamily: 'Roboto',
  },
  contenedorBotones: {
    width: '80%',
    alignItems: 'center',
  },
  boton: {
    backgroundColor: '#0052CC', 
    paddingVertical: 18,
    borderRadius: 12,
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 15,
    shadowColor: '#003366', 
  },
  botonAdmin: {
    backgroundColor: '#0052CC',
  },
  botonJugador: {
    backgroundColor: '#0077B6',
  },
  botonSeguidor: {
    backgroundColor: '#1E90FF',
  },
  iconoBoton: {
    width: 45,
    height: 72,
    marginRight: 25,
  },
  textoBoton: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    flex: 1,
    fontFamily: 'Roboto',
    paddingLeft: 55,
  },
});