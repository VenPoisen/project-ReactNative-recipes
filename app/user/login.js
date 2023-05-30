import { useRouter } from 'expo-router'
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'

import ScreenHeaderBtn from '../../components/headerBtn/ScreenHeaderBtn'
import { COLORS, FONT, SIZES } from '../../constants/theme'
import icons from '../../constants/icons'
import styles from '../../components/user/login.styles'

const Login = () => {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Lógica de autenticação do usuário
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <ScrollView contentContainerStyle={{ flex: 1 }}>
                <View style={styles.container}>
                    <Text style={styles.label}>Enter your email:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
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