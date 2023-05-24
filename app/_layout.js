import { useFonts } from "expo-font";
import { Drawer } from "../Drawer";
import { useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import { COLORS, FONT, SIZES } from "../constants/theme";

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
        <Drawer onLayout={onLayoutRootView} >
            <Drawer.Screen
                name="index"
                options={{
                    drawerLabel: "Home",
                    title: "Recipes",
                    headerTitleStyle: { color: COLORS.lightWhite, fontFamily: FONT.bold, fontSize: SIZES.xLarge, letterSpacing: 3 },
                    headerTintColor: COLORS.primary,
                    headerStyle: { backgroundColor: COLORS.buttonDark },
                    drawerActiveTintColor: COLORS.white,
                    drawerStyle: { backgroundColor: COLORS.primary },
                }}
            />
        </Drawer>
    );
}

export default Layout;