import React from 'react'
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native'
import { useRouter } from 'expo-router'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faCalendarAlt, faLayerGroup, faStopwatch, faPizzaSlice, faEye } from '@fortawesome/free-solid-svg-icons';

import foodImage from "../../assets/images/food.jpg";
import { COLORS, FONT, SHADOWS, SIZES } from '../../constants/theme'
import styles from '../../components/recipeDetail/recipeDetail.styles';

const RecipeDetail = ({ id }) => {
    const router = useRouter()

    return (
        <SafeAreaView>
            <ScrollView style={styles.scrollView}>
                <View style={SHADOWS.medium}>
                    <View style={styles.cardContainer}>
                        <TouchableOpacity>
                            <Image source={foodImage} style={styles.recipeImage} />
                        </TouchableOpacity>
                        <View style={styles.recipeDescriptionContainer}>
                            <Text style={styles.recipeTitle}>Big Poke Bowl</Text>
                            <View style={styles.recipeAuthorContainer}>
                                <TouchableOpacity>
                                    <Text style={styles.recipeLinkableInfoText}>
                                        <FontAwesomeIcon icon={faUser} style={styles.recipeLinkableInfoText} /> alanmartins
                                    </Text>
                                </TouchableOpacity>
                                <Text style={styles.recipeDateText}>
                                    <FontAwesomeIcon icon={faCalendarAlt} style={styles.recipeDateText} /> 13/05/2023 at 17:51
                                </Text>
                                <TouchableOpacity>
                                    <Text style={styles.recipeLinkableInfoText}>
                                        <FontAwesomeIcon icon={faLayerGroup} style={styles.recipeLinkableInfoText} /> salads
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <Text>This is the description of this recipe This is the description of this recipe This is the description of this recipe This is the description of this recipe</Text>
                        </View>
                        <View style={styles.recipeInfoContainer}>
                            <View>
                                <Text style={styles.recipeInfoTextTitle}><FontAwesomeIcon icon={faStopwatch} style={styles.recipeInfoTextTitle} /> Preparation</Text>
                                <Text style={styles.recipeInfoText}>25 minutes</Text>
                            </View>
                            <View>
                                <Text style={styles.recipeInfoTextTitle}><FontAwesomeIcon icon={faPizzaSlice} style={styles.recipeInfoTextTitle} /> Servings</Text>
                                <Text style={styles.recipeInfoText}>4 People</Text>
                            </View>
                        </View>
                        <View style={styles.recipeDescriptionContainer}>
                            <Text >{
                                `Ingredients:

- 1 tablespoon cornstarch
- 1 pound beef top sirloin steak, cut into thin strips
- 3/4 cup reduced-sodium chicken broth
- 2 tablespoons reduced-sodium soy sauce
- 1 tablespoon hoisin sauce
- 2 teaspoons sesame oil
- 1 tablespoon olive oil, divided
- 5 green onions, cut into 1-inch pieces
- 2 cups hot cooked rice`
                            }</Text>
                        </View>
                        <View style={styles.recipeDescriptionContainer}>
                            <Text>Tags:</Text>
                            <Text style={{ marginTop: SIZES.xxSmall }}>
                                <TouchableOpacity><Text style={styles.recipeLinkableInfoText}>salad, </Text>
                                </TouchableOpacity>
                                <TouchableOpacity><Text style={styles.recipeLinkableInfoText}>vegetables</Text>
                                </TouchableOpacity>
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView >
    )
}

export default RecipeDetail;