import React from "react";
import { DrawerToggleButton, createDrawerNavigator } from "@react-navigation/drawer";
import { useFonts } from "expo-font";
import { useCallback } from "react";

import { COLORS, FONT, SIZES } from "../constants/theme";
import { SplashScreen, usePathname, useRouter } from "expo-router";
import { LoginStackNavigator, RecipeStackNavigator } from "../navigation/StackNavigator";
import ScreenHeaderBtn from "../components/headerBtn/ScreenHeaderBtn";
import icons from "../constants/icons";
import CustomDrawerContent from "../navigation/DrawerNavigator";

const Drawer = createDrawerNavigator();

SplashScreen.preventAutoHideAsync();

const Layout = () => {

    const [fontsloaded] = useFonts({
        DMBold: require("../assets/fonts/RobotoSlab-Bold.ttf"),
        DMMedium: require("../assets/fonts/RobotoSlab-Medium.ttf"),
        DMRegular: require("../assets/fonts/RobotoSlab-Regular.ttf"),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsloaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsloaded])

    if (!fontsloaded) return null;


    return (
        <Drawer.Navigator
            onLayout={onLayoutRootView}
            backBehavior="initialRoute"
            initialRouteName='index'
            screenOptions={{
                drawerPosition: "right",
            }}
            drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
            <Drawer.Group screenOptions={{
                headerTitleStyle: {
                    color: COLORS.lightWhite,
                    fontFamily: FONT.bold, fontSize: SIZES.xLarge, letterSpacing: 3
                },
                headerStyle: {
                    backgroundColor: COLORS.buttonDark
                },
                drawerActiveTintColor: COLORS.white,
                drawerStyle: { backgroundColor: COLORS.primary },
                headerShown: false,
            }}>
                <Drawer.Screen
                    name="index"
                    component={RecipeStackNavigator}
                    options={{
                        drawerLabel: "Home",
                    }}
                />
                <Drawer.Screen
                    name="user"
                    component={LoginStackNavigator}
                    options={{
                        drawerLabel: "Login",
                    }}
                />
            </Drawer.Group>
        </Drawer.Navigator >

    );
}

export default Layout;