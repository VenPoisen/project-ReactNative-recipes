import React from 'react'
import { View, Text, SafeAreaView, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'

import { COLORS, SIZES } from '../../constants/theme'
import useFetch from '../../hook/useFetch';
import RecipeCardDetails from '../../components/recipeDetail/recipeDetail';

const RecipeDetail = ({ route }) => {
    const router = useRouter()
    const recipe_id = route.params.id

    const { data, isLoading, error, refetch } = useFetch(`v2/${recipe_id}`)

    const handlePressImage = () => {
        console.log(recipe_id)
        console.log(data)
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.buttonDark }}>
            <View style={{ flex: 1, backgroundColor: COLORS.white }}>
                {isLoading ? (
                    <ActivityIndicator size="large" color={COLORS.primary} style={{ paddingTop: SIZES.xxLarge }} />
                ) : error ? (
                    <Text>Something went wrong</Text>
                ) : data.length === 0 ? (
                    <Text>No data</Text>
                ) : (<RecipeCardDetails
                    recipe={data}
                    handlePressImage={handlePressImage}
                    refetch={refetch}
                />
                )}
            </View>
        </SafeAreaView >
    )
}

export default RecipeDetail;