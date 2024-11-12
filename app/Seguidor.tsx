import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet, TouchableOpacity, Text, Image, ImageBackground } from 'react-native';

const Seguidor = () => {
    const navigation = useNavigation();
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [correoUsuario, setCorreoUsuario] = useState('');
    const [contrasenaUsuario, setContrasenaUsuario] = useState('');
    const [modoIniciarSesion, setModoIniciarSesion] = useState(true);

    const manejarEnvio = async () => {
        if (modoIniciarSesion) {
            if (!correoUsuario || !contrasenaUsuario) {
                Alert.alert("Por favor, completa todos los campos.");
                return;
            }
        } else {
            if (!nombreUsuario || !correoUsuario || !contrasenaUsuario) {
                Alert.alert("Por favor, completa todos los campos.");
                return;
            }
        }
        
        const urlSolicitud = modoIniciarSesion ? 'http://10.0.0.42/rn4/Login.php' : 'http://10.0.0.42/rn4/SignUp.php';

        try {
            const respuesta = await fetch(urlSolicitud, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    UserName: modoIniciarSesion ? undefined : nombreUsuario,
                    UserEmail: correoUsuario,
                    UserPw: contrasenaUsuario,
                }),
            });

            const datos = await respuesta.json();

            if (modoIniciarSesion) {
                if (datos.success === true) {
                    Alert.alert("Bienvenido de vuelta");
                    navigation.navigate('Estangasions');
                } else {
                    Alert.alert("El email o la contraseña son incorrectos. Inténtalo de nuevo.");
                }
            } else {
                if (datos.Mensaje) {
                    Alert.alert(datos.Mensaje);
                } else {
                    Alert.alert("Ya puedes comenzar a usar nuestra app.");
                    navigation.navigate('Estangasions');
                }
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert("Hubo un problema al intentar registrarte. Intenta de nuevo más tarde.");
        }
    };

    const cambiarModo = () => {
        setModoIniciarSesion(prevModo => !prevModo);
        setNombreUsuario('');
        setCorreoUsuario('');
        setContrasenaUsuario('');
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

                    {!modoIniciarSesion && (
                        <TextInput
                            placeholder="Nombre de usuario"
                            value={nombreUsuario}
                            onChangeText={setNombreUsuario}
                            style={estilos.input}
                            placeholderTextColor="#FFFFFF"
                        />
                    )}

                    <TextInput
                        placeholder="Email"
                        value={correoUsuario}
                        onChangeText={setCorreoUsuario}
                        keyboardType="email-address"
                        style={estilos.input}
                        placeholderTextColor="#FFFFFF"
                    />
                    <TextInput
                        placeholder="Contraseña"
                        value={contrasenaUsuario}
                        onChangeText={setContrasenaUsuario}
                        secureTextEntry
                        style={estilos.input}
                        placeholderTextColor="#FFFFFF"
                    />

                    <TouchableOpacity style={estilos.boton} onPress={manejarEnvio}>
                        <Text style={estilos.textoBoton}>{modoIniciarSesion ? "Iniciar Sesión" : "Registrarse"}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={estilos.botonModo} onPress={cambiarModo}>
                        <Text style={estilos.textoBotonModo}>{`${modoIniciarSesion ? "Registrarse" : "Iniciar Sesión"}`}</Text>
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
    botonModo: {
        marginTop: 10,
        marginBottom: 20,
        alignItems: 'center',
    },
    textoBotonModo: {
        color: '#4F8EF7',
        fontSize: 16,
        textDecorationLine: 'underline',
        textAlign: 'center',
    },
});

export default Seguidor;
