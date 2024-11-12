import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '/RN4/rn4/app/(tabs)/index';
import Usuario from '/RN4/rn4/app/Usuario';
import Seguidor from '/RN4/rn4/app/Seguidor';
import Jugadores from '/RN4/rn4/app/Jugadores';
import Administrador from '/RN4/rn4/app/Administrador';
import Estangasions from '/RN4/rn4/app/Estangasions';
import JugadoresScreen from '/RN4/rn4/app/JugadoresScreen';
import Estadisticas from '/RN4/rn4/app/Estadisticas';
import Fixture from '/RN4/rn4/app/Fixture';
import TablaPosiciones from '/RN4/rn4/app/TablaPosiciones';
import AdministradorScrenn from '/RN4/rn4/app/AdministradorScreen'

type RootStackParamList = {
    HomeScreen: undefined;
    Usuario: undefined;
    Seguidor: undefined;
    Jugadores: undefined;
    Administrador: undefined;
    Estangasions: undefined;
    JugadoresScreen: undefined;
    TablaPosiciones: undefined;
    Estadisticas: undefined;
    Fixture: undefined;
    AdministradorScrenn: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const HomeStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#007387',
                },
                headerTintColor: '#fff', 
                headerTitleStyle: {
                    textAlign: 'center',
                    fontWeight: 'bold',
                },
            }}
        >
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="Usuario" component={Usuario} options={{ headerShown: false }} />
            <Stack.Screen name="Administrador" component={Administrador} />
            <Stack.Screen name="Jugadores" component={Jugadores} />
            <Stack.Screen name="Seguidor" component={Seguidor} />
            <Stack.Screen name="Estangasions" component={Estangasions} options={{ headerShown: false }}/>
            <Stack.Screen name="JugadoresScreen" component={JugadoresScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="Fixture" component={Fixture} options={{ headerShown: false }}/>
            <Stack.Screen name="TablaPosiciones" component={TablaPosiciones} options={{ headerShown: false }}/>
            <Stack.Screen name="Estadisticas" component={Estadisticas} options={{ headerShown: false }}/>
            <Stack.Screen name="AdministradorScrenn" component={AdministradorScrenn} options={{ headerShown: false }}/>
        </Stack.Navigator>
    );
};

const AppContainer = () => {
    return (
        <NavigationContainer>
            <HomeStack />
        </NavigationContainer>
    );
};

export default AppContainer;