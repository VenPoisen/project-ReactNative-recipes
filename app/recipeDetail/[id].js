import { View, Text } from 'react-native'
import React from 'react'
import { Drawer } from '../../Drawer'
import { SafeAreaView } from 'react-native'
import { COLORS, FONT, SIZES } from '../../constants/theme'
import ScreenHeaderBtn from '../../components/headerBtn/ScreenHeaderBtn'
import icons from '../../constants/icons'
import { useRouter } from 'expo-router'

const RecipeDetail = ({ id }) => {
    const router = useRouter()

    return (
        <SafeAreaView>
            <Drawer.Screen
                options={{
                    title: `Recipe id=${id}`,
                    headerTitleStyle: { color: COLORS.lightWhite, fontFamily: FONT.bold, fontSize: SIZES.xLarge, letterSpacing: 3 },
                    headerTintColor: COLORS.primary,
                    headerStyle: { backgroundColor: COLORS.buttonDark },
                    drawerLabel: "Recipe",
                    drawerActiveTintColor: COLORS.white,
                    drawerStyle: { backgroundColor: COLORS.primary },
                    headerRight: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.left}
                            dimension='60%'
                            handlePress={() => router.back()}
                        />
                    )
                }}
            />
            <View>
                <Text>recipe {id}</Text>
            </View>
        </SafeAreaView>
    )
}

export default RecipeDetail