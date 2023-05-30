import { useCallback, useState, } from 'react';
import { View, Text, FlatList, SafeAreaView, ActivityIndicator, StatusBar, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';

import { COLORS, SIZES } from '../constants/theme';
import useFetch from '../hook/useFetch';
import RecipesCard from '../components/recipesList/RecipesCard';

const HomeScreen = () => {
    const router = useRouter();

    const { recipes, isLoading, error, refetch } = useFetch("")

    const handleRecipeDetail = (recipe) => {
        router.push(`/recipeDetail/${recipe.id}`)
    };

    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refetch();
        setRefreshing(false);
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.buttonDark }}>
            <StatusBar barStyle="light-content" />
            <View style={{ flex: 1, backgroundColor: COLORS.white }}>
                {isLoading ? (
                    <ActivityIndicator size="large" color={COLORS.primary} style={{ paddingTop: SIZES.xxLarge }} />
                ) : error ? (
                    <Text>Something went wrong</Text>
                ) : (<FlatList
                    data={recipes.results}
                    renderItem={({ item }) => (
                        <RecipesCard
                            recipe={item}
                            handleRecipeDetail={handleRecipeDetail}
                        />
                    )}
                    keyExtractor={recipe => recipe?.id}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            tintColor='transparent'
                        />}
                />
                )}
            </View>
        </SafeAreaView >
    );
};

export default HomeScreen;
