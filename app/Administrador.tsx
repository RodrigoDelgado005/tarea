import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet, TouchableOpacity, Text, Image, ImageBackground } from 'react-native';

const Administrador = () => {
    const navegacion = useNavigation();
    const [usuario, setUsuario] = useState('');
    const [contraseña, setContraseña] = useState('');

    const handleSubmit = async () => {
        if (!usuario || !contraseña) {
            Alert.alert("Por favor, completa todos los campos.");
            return;
        }

        const urlSolicitud = 'http://10.0.0.42/rn4/LoginAdministrador.php';

        try {
            const response = await fetch(urlSolicitud, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    usuario,
                    contraseña
                })
            });

            const data = await response.json();

            if (data.success === true) {
                Alert.alert("Bienvenido de vuelta");
                navegacion.navigate('AdministradorScreen');
            } else {
                Alert.alert("El usuario o la contraseña son incorrectos. Inténtalo de nuevo.");
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert("Hubo un problema al intentar iniciar sesión. Intenta de nuevo más tarde.");
        }
    };

    const mostrarInfoKYC = () => {
        Alert.alert("¿Cómo obtengo las Credenciales?", "Las credenciales de administrador son otorgadas exclusivamente al personal autorizado por la Asociación Organizadora antes del inicio de la competición. Esto nos asegura que el personal encargado de gestionar y supervisar el correcto funcionamiento de la app esté debidamente preparado y equipado para cumplir con sus responsabilidades de manera eficiente.");
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
                        placeholder="Usuario"
                        value={usuario}
                        onChangeText={setUsuario}
                        keyboardType="email-address"
                        style={estilos.input}
                        placeholderTextColor="#FFFFFF"
                    />
                    <TextInput
                        placeholder="Contraseña"
                        value={contraseña}
                        onChangeText={setContraseña}
                        secureTextEntry
                        style={estilos.input}
                        placeholderTextColor="#FFFFFF"
                    />

                    <TouchableOpacity style={estilos.boton} onPress={handleSubmit}>
                        <Text style={estilos.textoBoton}>Iniciar Sesión</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={mostrarInfoKYC} style={estilos.botonInfoKYC}>
                        <Text style={estilos.textoInfoKYC}>¿Cómo obtengo las Credenciales?</Text>
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 1,
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
        shadowColor: '#003366',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
    },
    textoBoton: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    botonInfoKYC: {
        marginTop: 10,
        marginBottom: 20,
        alignItems: 'center',
    },
    textoInfoKYC: {
        color: '#4F8EF7',
        fontSize: 16,
        textDecorationLine: 'underline',
        textAlign: 'center',
    },
});

export default Administrador;
