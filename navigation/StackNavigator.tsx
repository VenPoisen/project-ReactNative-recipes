import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { DrawerToggleButton } from "@react-navigation/drawer";

import HomeScreen from "../app/index";
import Login from "../app/user/login";
import Register from "../app/user/register";
import RecipeDetail from "../app/recipeDetail/[id]";
import EditRecipe from "../app/userDashboard/editRecipe/[id]";
import Dashboard from "../app/userDashboard/dashboard";
import { COLORS, FONT, SIZES } from "../constants/theme";

const Stack = createStackNavigator();

const RecipeStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerTitleStyle: {
                color: COLORS.lightWhite,
                fontFamily: FONT.bold, fontSize: SIZES.xLarge, letterSpacing: 3
            },
            headerStyle: {
                backgroundColor: COLORS.buttonDark
            },
            headerRight: () => <DrawerToggleButton tintColor={COLORS.primary} />
        }}>
            <Stack.Screen name="Home" component={HomeScreen}
                options={{
                    title: "Recipes",
                }}
            />
            <Stack.Screen
                name="recipeDetail"
                component={RecipeDetail}
                options={{
                    title: "Recipe",
                    headerTintColor: COLORS.primary,
                }}
            />
        </Stack.Navigator>
    );
}

const LoginStackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="login"
            screenOptions={{
                headerTitleStyle: {
                    color: COLORS.lightWhite,
                    fontFamily: FONT.bold, fontSize: SIZES.xLarge, letterSpacing: 3
                },
                headerStyle: {
                    backgroundColor: COLORS.buttonDark
                },
                headerRight: () => <DrawerToggleButton tintColor={COLORS.primary} />,
            }}>
            <Stack.Screen name="login" component={Login}
                options={{
                    title: 'Login',
                }}
            />
            <Stack.Screen
                name="register"
                component={Register}
                options={{
                    title: "Register",
                }}
            />
        </Stack.Navigator>
    );
}

const UserStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerTitleStyle: {
                color: COLORS.lightWhite,
                fontFamily: FONT.bold, fontSize: SIZES.xLarge, letterSpacing: 3
            },
            headerStyle: {
                backgroundColor: COLORS.buttonDark
            },
            headerRight: () => <DrawerToggleButton tintColor={COLORS.primary} />
        }}>
            <Stack.Screen name="dashboard" component={Dashboard}
                options={{
                    title: 'Dashboard',
                }}
            />
            <Stack.Screen name="editRecipe/[id]" component={EditRecipe}
                options={{
                    title: 'Edit',
                }}
            />
        </Stack.Navigator>
    );
}

export { RecipeStackNavigator, LoginStackNavigator, UserStackNavigator };