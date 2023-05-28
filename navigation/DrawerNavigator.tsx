import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { useRouter } from "expo-router";

const CustomDrawerContent = (props) => {

    const router = useRouter();

    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
                label="Home"
                onPress={() => router.push('/')}
            />
            <DrawerItem
                label="Login"
                onPress={() => router.push('/user')}

            />
            {/* talvez consigo passar aqui os links e forcar  */}
            <DrawerItem
                label="Help"
                onPress={() => alert('Link to help')}

            />
        </DrawerContentScrollView>
    );
}

export default CustomDrawerContent;