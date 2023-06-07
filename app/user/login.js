import { useRouter } from 'expo-router';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import React, { useState, useContext } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

import { COLORS, SIZES } from '../../constants/theme'
import styles from '../../components/user/login.styles'
import { AuthContext } from '../../utils/authChecker';

import { BASE_URL } from "@env";

const baseUrl = BASE_URL

const Login = () => {
    const router = useRouter();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setIsAuthenticated } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false)

    const handleLogin = async () => {
        // User Authentication logic
        try {
            if (username.length === 0 || password.length === 0) {
                Alert.alert("Incorrect username or password")
                return;
            }
            else {
                setIsLoading(true);

                const response = await axios.post(`${baseUrl}token/`, { username, password });

                // Checks if credentials are valid
                if (response.status === 200) {
                    try {
                        // Save tokens on SecureStore
                        await SecureStore.setItemAsync("accessToken", response.data.access);
                        await SecureStore.setItemAsync("refreshToken", response.data.refresh);

                        setIsAuthenticated(true);
                        setUsername('')
                        setPassword('')
                        router.push("/userDashboard/dashboard")
                    } catch (error) {
                        Alert.alert('Error', 'Something went wrong, try again')
                    }
                } else {
                    Alert.alert('Error', 'Authentication failed. Check your username and password')
                }
            }
        }
        catch (error) {
            Alert.alert('Error', 'Authentication failed. Check your username and password')
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
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
                    {isLoading && <ActivityIndicator size="large" color={COLORS.primary} style={{ paddingTop: SIZES.medium }} />}
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