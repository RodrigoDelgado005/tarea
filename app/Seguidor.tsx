import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';

const Seguidor = () => {
    const navigation = useNavigation();
    const [UserName, setUserName] = useState(''); 
    const [UserEmail, setUserEmail] = useState('');
    const [UserPw, setUserPw] = useState('');
    const [iniciarSesion, setiniciarSesion] = useState(true);
     

    // Función para manejar el envío del formulario
    const handleSubmit = async () => {
        if (iniciarSesion) {
            // Valida los datos antes de enviar
            if (!UserEmail || !UserPw) {
                Alert.alert("Por favor, completa todos los campos.");
                return;
            }
        } else {
            if (!UserName || !UserEmail || !UserPw) {
                Alert.alert("Por favor, completa todos los campos.");
                return;
            }
        }
        // url según el modo 
        const urlSolicitud = iniciarSesion ? 'http://192.168.1.48/rn4/Login.php' : 'http://192.168.1.48/rn4/SignUp.php';

        try {
            // Realiza la solicitud POST a la url 
            const response = await fetch(urlSolicitud, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    // Envia los datos del usuario dependiendo si esta en registro o inicio de sesión
                    UserName: iniciarSesion ? undefined : UserName,
                    UserEmail: UserEmail,
                    UserPw: UserPw
                })
            });

            // procesa la respuesta JSON
            const data = await response.json();

            // maneja la respuesta y muestra un mensaje según sea el caso
            if (iniciarSesion) {
                if (data.success === true) {
                    Alert.alert("Bienvenido de vuelta");
                    navigation.navigate('Estangasions'); 
                } else {
                    Alert.alert("El email o la contraseña son incorrectos. Inténtalo de nuevo.");
                }
            } else {
                if (data.Mensaje) {
                    Alert.alert(data.Mensaje);
                } else {
                    Alert.alert("Ya podes comenzar a usar nuestra app.");
                    navigation.navigate('Estangasions'); 
                }
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert("Hubo un problema al intentar registrarte. Intenta de nuevo más tarde.");
        }
    };

    // Función para cambiar entre modos de inicio de sesión y registro
    const cambiarModo = () => {
        setiniciarSesion(prevMode => !prevMode);
        setUserName('');
        setUserEmail('');
        setUserPw('');
    };

    return (
        // Componente principal con el formulario y botones para cambiar entre modos
        <View style={styles.containerFondo}>
            <View style={styles.container}>
                <Image
                    source={require('C:/RN4/rn4/assets/images/copa.png')}
                    style={styles.logo}
                />

                {!iniciarSesion && (
                    <TextInput
                        placeholder="Nombre de usuario"
                        value={UserName}
                        onChangeText={setUserName}
                        style={styles.input}
                        placeholderTextColor="#FFFFFF" 
                    />
                )}
                <TextInput
                    placeholder="Email"
                    value={UserEmail}
                    onChangeText={setUserEmail}
                    keyboardType="email-address"
                    style={styles.input}
                    placeholderTextColor="#FFFFFF"
                />
                <TextInput
                    placeholder="Contraseña"
                    value={UserPw}
                    onChangeText={setUserPw}
                    secureTextEntry
                    style={styles.input}
                    placeholderTextColor="#FFFFFF"
                />

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>{iniciarSesion ? "Iniciar Sesión" : "Registrarse"}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.modeButton} onPress={cambiarModo}>
                    <Text style={styles.modeButtonText}>{`${iniciarSesion ? "Registrarse" : "Iniciar Sesión"}`}</Text>
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
    modeButton: {
        marginTop: 15,
        alignSelf: 'center',
    },
    modeButtonText: {
        color: '#4F8EF7',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '600',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Seguidor;