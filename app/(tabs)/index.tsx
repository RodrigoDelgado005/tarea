import { StyleSheet, TouchableOpacity, View, Text, ImageBackground, Image, SafeAreaView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useNavigation } from '@react-navigation/native';

export default function PantallaInicio() {
  const navegacion = useNavigation();

  const alPresionar = () => {
    navegacion.navigate('Usuario');
  };

  return (
    <SafeAreaView style={estilos.areaSegura}>
      <ImageBackground
        source={require('/RN4/rn4/assets/images/background.jpg')}
        style={estilos.fondo}
        resizeMode="cover"
      >
        <View style={estilos.contenedor}>
          <View style={estilos.contenedorContenido}>
            <View style={estilos.tamañoLogo}>
              <Image
                source={require('/RN4/rn4/assets/images/copa.png')}
                style={estilos.logo}
                resizeMode="contain"
              />
            </View>
            <ThemedText style={estilos.texto}>
              Disfruta de la Mejor Liga de Fútbol Mundial en el Terreno de Juego Más Prestigioso.
            </ThemedText>
            <TouchableOpacity style={estilos.boton} onPress={alPresionar}>
              <Text style={estilos.textoBoton}>COMENZAR</Text>
            </TouchableOpacity>
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
  fondo: {
    flex: 1,
    width: '100%',
  },
  contenedor: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 30, 0.7)', 
  },
  contenedorContenido: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  tamañoLogo: {
    width: 200,
    height: 175,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  texto: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
    lineHeight: 25,
  },
  boton: {
    backgroundColor: '#0052CC',
    paddingVertical: 15,
    borderRadius: 30,
    width: '70%',
  },
  textoBoton: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 2,
  },
});
