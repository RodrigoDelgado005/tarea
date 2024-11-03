import { StyleSheet, TouchableOpacity, View, Text, ImageBackground, Image, Dimensions, SafeAreaView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require('/RN4/rn4/assets/images/background.jpg')}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <View style={styles.logoTamaño}>
              <Image
                source={require('/RN4/rn4/assets/images/copa.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
            <ThemedText type="title" style={styles.title}>
              ESTANGA <Text style={styles.estangaText}>LEAGUE</Text>
            </ThemedText>
            <ThemedText style={styles.text}>
              Disfruta de la Mejor Liga del Fútbol Mundial dentro del Terreno de Juego Mas Prestigioso.
            </ThemedText>
            <TouchableOpacity style={styles.button} onPress={handlePress}>
              <Text style={styles.buttonText}>COMENZAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,15,44,0.7)',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoTamaño: {
    width: 150,
    height:175,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 19,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 33,
    fontWeight: '',
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
  },
  estangaText: {
    color: '#00B7ED',
  },
  text: {
    color: 'white',
    fontSize: 17,
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 10,
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#00B7ED',
    paddingVertical: 15,
    borderRadius: 25,
    width: '70%',
  },
  buttonText: {
    color: 'white',
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 2,
  },
});