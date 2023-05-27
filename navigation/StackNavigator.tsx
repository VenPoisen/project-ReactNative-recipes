import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../app/index";
import Login from "../app/user/login";
import Register from "../app/user/register";
import RecipeDetail from "../app/recipeDetail/[id]";

const Stack = createStackNavigator();

const RecipeStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen
                name="recipeDetail"
                component={RecipeDetail}
            />
        </Stack.Navigator>
    );
}

const LoginStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="register" component={Register} />
        </Stack.Navigator>
    );
}

export { RecipeStackNavigator, LoginStackNavigator };