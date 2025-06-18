import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';

export default function LoginScreen({ navigation }) {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const isAlpha = (text) => /^[A-Za-z]+$/.test(text);

    const handleLogin = () => {
        if (!name || !password) {
            Alert.alert('Campos vacíos');
            return;
        }
        if (!isAlpha(name)) {
            Alert.alert('El nombre solo debe contener letras');
            return;
        }
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            <TextInput
                testID="input-name"
                placeholder="Nombre"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />
            <TextInput
                testID="input-password"
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />
            <Button testID="btn-login" title="Ingresar" onPress={handleLogin} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
});