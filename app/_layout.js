import React, { useCallback } from "react";
import { SplashScreen } from "expo-router";
import { useFonts } from "expo-font";

import { AuthChecker } from "../utils/authChecker";
import { DrawerNavigator } from "../navigation/DrawerNavigator";

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
        <AuthChecker onLayout={onLayoutRootView}>
            <DrawerNavigator />
        </AuthChecker>
    )
}

export default Layout;