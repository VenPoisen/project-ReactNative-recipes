import { useRouter } from 'expo-router'
import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'

import { Drawer } from '../../navigation/DrawerNavigator'
import ScreenHeaderBtn from '../../components/headerBtn/ScreenHeaderBtn'
import { COLORS, FONT, SIZES } from '../../constants/theme'
import icons from '../../constants/icons'

const Register = () => {
    const router = useRouter()

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <Drawer.Screen
                options={{
                    title: "Register",
                    headerTitleStyle: { color: COLORS.lightWhite, fontFamily: FONT.bold, fontSize: SIZES.xLarge, letterSpacing: 3 },
                    headerStyle: { backgroundColor: COLORS.buttonDark },
                    drawerLabel: "Register",
                    drawerActiveTintColor: COLORS.white,
                    drawerStyle: { backgroundColor: COLORS.primary },
                    headerLeft: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.left}
                            dimension='60%'
                            handlePress={() => router.back()}
                        />
                    )
                }}
            />

            <Text>Login</Text>
        </SafeAreaView>
    )
}

export default Register;