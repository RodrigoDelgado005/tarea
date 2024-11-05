import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';

const Administrador = () => {
    const navigation = useNavigation();
    const [usuario, setusuario] = useState('');
    const [contraseña, setcontraseña] = useState('');

    // Función para manejar el envío del formulario de inicio de sesión
    const handleSubmit = async () => {
        if (!usuario || !contraseña) {
            Alert.alert("Por favor, completa todos los campos.");
            return;
        }

        const urlSolicitud = 'http://192.168.1.48/rn4/LoginAdministrador.php';

        try {
            // Realiza la solicitud POST para el inicio de sesión
            const response = await fetch(urlSolicitud, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    usuario: usuario,
                    contraseña: contraseña
                })
            });

            // Procesa la respuesta JSON
            const data = await response.json();

            // Maneja la respuesta y muestra un mensaje según el caso
            if (data.success === true) {
                Alert.alert("Bienvenido de vuelta");
                navigation.navigate('Estangasions');
            } else {
                Alert.alert("El email o la contraseña son incorrectos. Inténtalo de nuevo.");
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert("Hubo un problema al intentar iniciar sesión. Intenta de nuevo más tarde.");
        }
    };

    const mostrarInfoKYC = () => {
        Alert.alert("¿Como obtengo las Credenciales?", "Las credenciales de administrador son otorgadas exclusivamente al personal autorizado por la Asociación Organizadora antes del inicio de la competición. Esto nos asegura que el personal encargado de gestionar y supervisar el correcto funcionamiento de la app esté debidamente preparado y equipado para cumplir con sus responsabilidades de manera eficiente.");
    };

    return (
        <View style={styles.containerFondo}>
            <View style={styles.container}>
                <Image
                    source={require('C:/RN4/rn4/assets/images/copa.png')}
                    style={styles.logo}
                />

                <TextInput
                    placeholder="Usuario"
                    value={usuario}
                    onChangeText={setusuario}
                    keyboardType="email-address"
                    style={styles.input}
                    placeholderTextColor="#FFFFFF"
                />
                <TextInput
                    placeholder="Contraseña"
                    value={contraseña}
                    onChangeText={setcontraseña}
                    secureTextEntry
                    style={styles.input}
                    placeholderTextColor="#FFFFFF"
                />

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Iniciar Sesión</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={mostrarInfoKYC} style={styles.adminButton}>
                    <Text style={styles.adminText}>¿Como obtengo las Credenciales?</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// Estilos para los componentes
const styles = StyleSheet.create({
    containerFondo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212', 
    },
    container: {
        width: '90%',
        padding: 30,
        borderRadius: 25,
        backgroundColor: '#2A2A2A',
    },
    logo: {
        width: 175,
        height: 110,
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
    button: {
        backgroundColor: '#4F8EF7', 
        paddingVertical: 15,
        borderRadius: 12,
        width: '100%',
        alignSelf: 'center',
        marginBottom: 25,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    adminButton: {
        marginTop: 10,
        marginBottom: 20,
        alignItems: 'center', // Alinear el texto al centro
    },
    adminText: {
        color: '#4F8EF7',
        fontSize: 16,
        textDecorationLine: 'underline',
        textAlign: 'center',
    },
});

export default Administrador;
