import { useContext } from "react";
import { CommonActions } from "@react-navigation/native";
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { useRouter, useNavigation } from "expo-router";
import * as SecureStore from 'expo-secure-store';

import { AuthChecker, AuthContext } from "../utils/authChecker";

const CustomDrawerContent = (props) => {

    const router = useRouter();
    const navigation = useNavigation();

    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

    const resetNavigation = () => {
        const resetAction = CommonActions.reset({
            index: 0,
            routes: [{ name: 'index' }],
        });
        navigation.dispatch(resetAction);
    };

    const pushRegister = async () => {
        await router.push("/user");
        router.push("/user/register");
    }

    const handleLogout = async () => {
        try {
            await SecureStore.deleteItemAsync('refreshToken');
            await SecureStore.deleteItemAsync('accessToken');

            setIsAuthenticated(false);

            resetNavigation();

        } catch (error) {
            console.log("Could not delete the tokens", error);
        }
    };

    return (
        <AuthChecker>
            <DrawerContentScrollView {...props} >
                <DrawerItemList  {...props} />
                {!isAuthenticated ?
                    (<DrawerItem
                        label="Register"
                        onPress={pushRegister}
                    />
                    ) : null}
                < DrawerItem
                    label="Help"
                    onPress={() => alert('Link to help')}
                />
                {isAuthenticated ?
                    (<DrawerItem
                        label="Logout"
                        onPress={handleLogout}
                    />) : null}
            </DrawerContentScrollView>
        </AuthChecker>
    );
}

export default CustomDrawerContent;