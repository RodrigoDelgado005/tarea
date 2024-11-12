import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet, TouchableOpacity, Text, Image, ImageBackground } from 'react-native';

const Jugadores = () => {
    const navigation = useNavigation();
    const [nombreCompleto, setNombreCompleto] = useState('');
    const [claveKyc, setClaveKyc] = useState('');

    const handleSubmit = async () => {
        if (!nombreCompleto || !claveKyc) {
            Alert.alert("Por favor, completa todos los campos.");
            return;
        }

        const urlSolicitud = 'http://10.0.0.42/rn4/LoginJugadores.php';

        try {
            const response = await fetch(urlSolicitud, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombre_completo: nombreCompleto,
                    claveKyc: claveKyc
                })
            });

            const data = await response.json();

            if (data.success === true && data.jugador_id) {
                await AsyncStorage.setItem('jugador_id', data.jugador_id.toString());
                await AsyncStorage.setItem('nombre_completo', nombreCompleto);

                Alert.alert("Bienvenido de vuelta");
                navigation.navigate('JugadoresScreen');
            } else {
                Alert.alert("El nombre o la clave son incorrectos. Inténtalo de nuevo.");
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert("Hubo un problema al intentar iniciar sesión. Intenta de nuevo más tarde.");
        }
    };

    const mostrarInfoKYC = () => {
        Alert.alert("¿Qué es Clave KYC?", "La Clave KYC es un método de acceso exclusivo destinado a los jugadores de la competición, el cual es proporcionado por la Asociación Organizadora a los clubes participantes. Para obtener esta Clave KYC, un representante autorizado del club debe solicitar la credencial correspondiente para aquellos jugadores que necesiten acceder a la aplicación. Este acceso les permitirá acceder a su información en la competicion de manera segura.");
    };

    return (
        <ImageBackground
            source={require('C:/RN4/rn4/assets/images/background.jpg')}
            style={estilos.fondo}
            resizeMode="cover"
        >
            <View style={estilos.contenedor}>
                <View style={estilos.contenedorFormulario}>
                    <Image
                        source={require('C:/RN4/rn4/assets/images/copa.png')}
                        style={estilos.logo}
                    />

                    <TextInput
                        placeholder="Nombre Completo"
                        value={nombreCompleto}
                        onChangeText={setNombreCompleto}
                        style={estilos.input}
                        placeholderTextColor="#FFFFFF"
                    />
                    <TextInput
                        placeholder="Clave KYC"
                        value={claveKyc}
                        onChangeText={setClaveKyc}
                        secureTextEntry
                        style={estilos.input}
                        placeholderTextColor="#FFFFFF"
                    />

                    <TouchableOpacity style={estilos.boton} onPress={handleSubmit}>
                        <Text style={estilos.textoBoton}>Iniciar Sesión</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={mostrarInfoKYC} style={estilos.botonKyc}>
                        <Text style={estilos.textoBotonKyc}>¿Qué es Clave KYC?</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
};

const estilos = StyleSheet.create({
    fondo: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    contenedor: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(18, 18, 18, 0.8)', 
    },
    contenedorFormulario: {
        width: '90%',
        padding: 30,
        borderRadius: 25,
        backgroundColor: '#2A2A2A', 
    },
    logo: {
        width: 150,
        height: 142,
        alignSelf: 'center',
        marginBottom: 30,
    },
    input: {
        borderWidth: 0,
        marginBottom: 20,
        padding: 15,
        borderRadius: 12,
        backgroundColor: '#4c4b4e', 
        color: '#FFFFFF',
        fontSize: 16,
    },
    boton: {
        backgroundColor: '#4F8EF7', 
        paddingVertical: 15,
        borderRadius: 12,
        width: '100%',
        alignSelf: 'center',
        marginBottom: 25,
    },
    textoBoton: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    botonKyc: {
        marginTop: 10,
        marginBottom: 20,
        alignItems: 'center',
    },
    textoBotonKyc: {
        color: '#4F8EF7', 
        fontSize: 16,
        textDecorationLine: 'underline',
        textAlign: 'center',
    },
});

export default Jugadores;