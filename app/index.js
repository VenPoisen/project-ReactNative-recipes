import 'react-native-gesture-handler';
import { useEffect, useState, } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, SafeAreaView, ScrollView, ActivityIndicator, StatusBar, Button } from 'react-native';
import { useRouter } from 'expo-router';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faCalendarAlt, faLayerGroup, faStopwatch, faPizzaSlice, faEye } from '@fortawesome/free-solid-svg-icons';

import { COLORS, SHADOWS, FONT, SIZES } from '../constants/theme';
import useFetch from '../hook/useFetch';
import foodImage from "../assets/images/food.jpg";
import styles from '../components/index.styles';
import RecipesCard from '../components/recipesList/RecipesCard';

const HomeScreen = () => {
    const router = useRouter();

    const renderRecipeCard = ({ item }) => (
        <TouchableOpacity onPress={() => handleRecipePress(item.id)}>
            <View style={{ padding: 16, marginBottom: 16, backgroundColor: COLORS.tertiary }}>
                <Image source={{ uri: item.cover }} style={{ width: '100%', height: 200, marginBottom: 8 }} />
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
                <Text>{item.description}</Text>
            </View>
        </TouchableOpacity>
    );

    const { recipes, isLoading, error } = useFetch("")

    const handleRecipeDetail = (recipe) => {
        // Navegar para a tela de detalhes da receita com o ID fornecido
        router.push(`/recipeDetail/${recipe.id}`)
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.white} />

            {isLoading ? (
                <ActivityIndicator size="large" colors={COLORS.primary} />
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
            />
            )}
        </SafeAreaView >
    );
};

export default HomeScreen;
