import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';

const Jugadores = () => {
    const navigation = useNavigation();
    const [nombre_completo, setnombre_completo] = useState('');
    const [claveKyc, setclaveKyc] = useState('');

    // Función para manejar el envío del formulario de inicio de sesión
    const handleSubmit = async () => {
        if (!nombre_completo || !claveKyc) {
            Alert.alert("Por favor, completa todos los campos.");
            return;
        }

        const urlSolicitud = 'http://192.168.1.48/rn4/LoginJugadores.php';

        try {
            // Realiza la solicitud POST para el inicio de sesión
            const response = await fetch(urlSolicitud, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombre_completo: nombre_completo,
                    claveKyc: claveKyc
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

    // Función para mostrar el mensaje de explicación de Clave KYC
    const mostrarInfoKYC = () => {
        Alert.alert("¿Qué es Clave KYC?", "La Clave KYC es un método de acceso exclusivo destinado a los jugadores de la competición, el cual es proporcionado por la Asociación Organizadora a los clubes participantes. Para obtener esta Clave KYC, un representante autorizado del club debe solicitar la credencial correspondiente para aquellos jugadores que necesiten acceder a la aplicación. Este acceso les permitirá acceder a su información en la competicion de manera segura.")
    };

    return (
        <View style={styles.containerFondo}>
            <View style={styles.container}>
                <Image
                    source={require('C:/RN4/rn4/assets/images/copa.png')}
                    style={styles.logo}
                />

                <TextInput
                    placeholder="Nombre Completo"
                    value={nombre_completo}
                    onChangeText={setnombre_completo}
                    keyboardType="email-address"
                    style={styles.input}
                    placeholderTextColor="#FFFFFF"
                />
                <TextInput
                    placeholder="Clave KYC"
                    value={claveKyc}
                    onChangeText={setclaveKyc}
                    secureTextEntry
                    style={styles.input}
                    placeholderTextColor="#FFFFFF"
                />

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Iniciar Sesión</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={mostrarInfoKYC} style={styles.kycButton}>
                    <Text style={styles.kycText}>¿Qué es Clave KYC?</Text>
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
    kycButton: {
        marginTop: 10,
        marginBottom: 20,
        alignItems: 'center', // Alinear el texto al centro
    },
    kycText: {
        color: '#4F8EF7',
        fontSize: 16,
        textDecorationLine: 'underline',
        textAlign: 'center',
    },
});

export default Jugadores;
