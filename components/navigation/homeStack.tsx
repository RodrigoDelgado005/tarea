import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '/RN4/rn4/app/(tabs)/index';
import Usuario from '/RN4/rn4/app/Usuario';
import Seguidor from '/RN4/rn4/app/Seguidor';
import Jugadores from '/RN4/rn4/app/Jugadores';
import Administrador from '/RN4/rn4/app/Administrador';
import Estangasions from '/RN4/rn4/app/Estangasions';

type RootStackParamList = {
    HomeScreen: undefined;
    Usuario: undefined;
    Seguidor: undefined;
    Jugadores: undefined;
    Administrador: undefined;
    Estangasions: undefined;
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
            <Stack.Screen name="Usuario" component={Usuario} />
            <Stack.Screen name="Administrador" component={Administrador} />
            <Stack.Screen name="Jugadores" component={Jugadores} />
            <Stack.Screen name="Seguidor" component={Seguidor} />
            <Stack.Screen name="Estangasions" component={Estangasions} options={{ headerShown: false }}/>
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
