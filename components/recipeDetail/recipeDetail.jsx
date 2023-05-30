import { useCallback, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, RefreshControl } from 'react-native'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faCalendarAlt, faLayerGroup, faStopwatch, faPizzaSlice, faEye } from '@fortawesome/free-solid-svg-icons';

import { SHADOWS, SIZES } from '../../constants/theme';
import styles from './recipeDetail.styles';
import { checkImageURL } from '../../utils/checkImageUrl';
import foodImage from "../../assets/images/food.jpg";

const RecipeCardDetails = ({ recipe, handlePressImage, refetch }) => {
    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refetch();
        setRefreshing(false);
    }, [])

    return (
        <ScrollView style={styles.scrollView} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor='transparent' />} showsVerticalScrollIndicator={false}>
            <View style={SHADOWS.medium}>
                <View style={styles.cardContainer}>
                    <TouchableOpacity onPress={handlePressImage}>
                        <Image
                            source={{
                                uri: checkImageURL(recipe.cover)
                                    ? recipe.cover
                                    : foodImage
                            }}
                            style={styles.recipeImage} />
                    </TouchableOpacity>
                    <View style={styles.recipeDescriptionContainer}>
                        <Text style={styles.recipeTitle}>{recipe.title}</Text>
                        <View style={styles.recipeAuthorContainer}>
                            <TouchableOpacity>
                                <Text style={styles.recipeLinkableInfoText}>
                                    <FontAwesomeIcon icon={faUser} style={styles.recipeLinkableInfoText} /> {recipe.author}
                                </Text>
                            </TouchableOpacity>
                            <Text style={styles.recipeDateText}>
                                <FontAwesomeIcon icon={faCalendarAlt} style={styles.recipeDateText} /> {recipe.created_at}
                            </Text>
                            <TouchableOpacity>
                                <Text style={styles.recipeLinkableInfoText}>
                                    <FontAwesomeIcon icon={faLayerGroup} style={styles.recipeLinkableInfoText} /> {recipe.category}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <Text>{recipe.description}</Text>
                    </View>
                    <View style={styles.recipeInfoContainer}>
                        <View>
                            <Text style={styles.recipeInfoTextTitle}><FontAwesomeIcon icon={faStopwatch} style={styles.recipeInfoTextTitle} /> Preparation</Text>
                            <Text style={styles.recipeInfoText}>{recipe.preparation}</Text>
                        </View>
                        <View>
                            <Text style={styles.recipeInfoTextTitle}><FontAwesomeIcon icon={faPizzaSlice} style={styles.recipeInfoTextTitle} /> Servings</Text>
                            <Text style={styles.recipeInfoText}>{recipe.servings} {recipe.servings_unit}</Text>
                        </View>
                    </View>
                    <View style={styles.recipeDescriptionContainer}>
                        <Text >{recipe.preparation_steps}</Text>
                    </View>
                    <View style={styles.recipeDescriptionContainer}>
                        <Text>Tags:</Text>
                        <Text style={{ marginTop: SIZES.xxSmall }}>
                            {recipe.tag_objects.map(tag => (
                                <TouchableOpacity key={tag.id}>
                                    <Text style={styles.recipeLinkableInfoText}>{tag.name}, </Text>
                                </TouchableOpacity>
                            ))
                            }
                        </Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default RecipeCardDetails;