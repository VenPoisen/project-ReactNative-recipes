import { Text, ScrollView, View, ActivityIndicator, SafeAreaView, Alert, TouchableOpacity, TextInput, RefreshControl } from 'react-native'
import React, { useContext, useEffect, useState, useCallback } from 'react'
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

import RecipeCard from '../../components/dashboard/createdRecipe';
import useFetch from '../../hook/useFetch';
import { AuthContext } from '../../utils/authChecker';
import { useNavigation, useRouter } from 'expo-router';
import { CommonActions } from '@react-navigation/native';
import { COLORS, SIZES } from '../../constants/theme';
import styles from '../../components/dashboard/dashboard.styles';

import { AUTHOR_URL } from "@env";

const authorUrl = AUTHOR_URL

const Dashboard = () => {

    const router = useRouter();
    const navigation = useNavigation();
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

    const { data, error, refetch } = useFetch('v2/');
    const { data: dataTags, error: errorTags } = useFetch('tags/v2/');
    const [isLoading, setIsLoading] = useState(true);
    const [recipes, setRecipes] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [username, setUsername] = useState('');

    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refetch();
        setRefreshing(false);
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken = await SecureStore.getItemAsync("accessToken");
                const userInfo = await axios.get(
                    `${authorUrl}me/`,
                    { headers: { 'Authorization': `Bearer ${accessToken}` } }
                );
                const filteredRecipes = data.results.filter(
                    recipe => recipe.author_id === userInfo.data.id
                );

                setUsername(userInfo.data.username);
                setRecipes(filteredRecipes);
                setIsLoading(false);

            } catch (error) {
                Alert.alert('error', 'Something went wrong, try again')
            }
        }

        if (!isAuthenticated) {
            const resetAction = CommonActions.reset({
                index: 0,
                routes: [{ name: 'index' }],
            });
            navigation.dispatch(resetAction);
        } else {
            if (data.results) {
                fetchData();
            } else {
                refetch();
            }
        }
    }, [data]);

    const handleEditRecipe = (recipe) => {
        router.push(`/userDashboard/editRecipe/${recipe.id}`)
        router.setParams({ 'recipe': recipe, 'tags': dataTags.results })
    }
    const handleDeleteRecipe = (recipe) => {

    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.buttonDark }}>
            <View style={{ flex: 1, backgroundColor: COLORS.white }}>
                {isLoading ? (
                    <ActivityIndicator size="large" color={COLORS.primary} style={{ paddingTop: SIZES.xxLarge }} />
                ) : error ? (
                    <Text>Something went wrong</Text>
                ) :
                    <>
                        <View style={styles.container}>
                            <Text style={[styles.title, styles.centerText]}>Welcome {username.charAt(0).toUpperCase() + username.slice(1)}</Text>
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Search..."
                                placeholderTextColor={COLORS.gray}
                                value={searchText}
                                onChangeText={text => setSearchText(text)}
                            />
                            <TouchableOpacity style={styles.createButton}>
                                <Text style={styles.createButtonText}>New Recipe</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.recipeTitle}>Your Recipes</Text>
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={refreshing}
                                        onRefresh={onRefresh}
                                        tintColor={COLORS.primary}
                                    />}
                            >
                                {recipes && recipes.length > 0 ? recipes.map((recipe) => (
                                    <RecipeCard
                                        key={recipe.id}
                                        recipe={recipe}
                                        onEdit={handleEditRecipe}
                                        onDelete={handleDeleteRecipe}
                                    />)
                                ) : <Text style={{ margin: SIZES.medium }}>You do not have recipes, please create one</Text>}
                            </ScrollView>
                        </View>
                    </>
                }
            </View>
        </SafeAreaView >
    )
}

export default Dashboard;