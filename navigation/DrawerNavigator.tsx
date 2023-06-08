import React, { useContext } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { COLORS, FONT, SIZES } from "../constants/theme";
import { LoginStackNavigator, RecipeStackNavigator, UserStackNavigator } from "../navigation/StackNavigator";
import CustomDrawerContent from "../navigation/DrawerContent";
import { AuthContext } from "../utils/authChecker";

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {

    const { isAuthenticated } = useContext(AuthContext);

    return (
        <Drawer.Navigator
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
                {isAuthenticated ?
                    (<Drawer.Screen
                        name="userDashboard"
                        component={UserStackNavigator}
                        options={{
                            drawerLabel: "Dashboard",
                        }}
                    />) :
                    (<Drawer.Screen
                        name="user"
                        component={LoginStackNavigator}
                        options={{
                            drawerLabel: "Login",
                        }}
                    />)}
            </Drawer.Group>
        </Drawer.Navigator >
    )
}
