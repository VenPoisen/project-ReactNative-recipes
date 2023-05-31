import { useRouter } from 'expo-router';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

import { COLORS, FONT, SIZES } from '../../constants/theme'
import styles from '../../components/user/login.styles'

import { BASE_URL } from "@env";
import { Alert } from 'react-native';

const baseUrl = BASE_URL

const Login = () => {
    const router = useRouter();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const handleLogin = async () => {
        // Lógica de autenticação do usuário
        console.log(username, password)
        try {
            if (username.length === 0 || password.length === 0) {
                Alert.alert("Incorrect username or password")
            } else {
                const response = await axios.post(`${baseUrl}token/`, { username, password })

                // Save on SecureStore
                await SecureStore.setItemAsync("accessToken", response.data.access);
                await SecureStore.setItemAsync("refreshToken", response.data.refresh);

                router.push("/userDashboard/dashboard")
                setUsername('')
                setPassword('')
            }
        }
        catch (error) {
            console.log(error)
            Alert.alert('Error', 'Authentication failed. Check your username and password')
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <ScrollView contentContainerStyle={{ flex: 1 }}>
                <View style={styles.container}>
                    <Text style={styles.label}>Enter your username:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        value={username}
                        onChangeText={setUsername}
                    />
                    <Text style={styles.label}>Enter your password:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <View style={styles.registerView}>
                        <Text style={styles.registerText}>Not a member?</Text>
                        <TouchableOpacity onPress={() => { router.push('/user/register') }}>
                            <Text style={[styles.registerText, styles.registerTextLink]}>Click here to Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Login;