import { Text, TouchableOpacity, View, Image } from "react-native"

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faCalendarAlt, faLayerGroup, faStopwatch, faPizzaSlice, faEye } from '@fortawesome/free-solid-svg-icons';

import styles from "../index.styles";
import { SHADOWS } from "../../constants/theme";

const RecipesCard = ({ recipe, handleRecipeDetail }) => {
    return (
        <View style={SHADOWS.medium}>
            <View style={styles.cardContainer}>
                < TouchableOpacity onPress={() => handleRecipeDetail(recipe)}>
                    <Image source={{ uri: recipe.cover }} style={styles.recipeImage} />
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
                <TouchableOpacity style={styles.readMoreButton} onPress={() => handleRecipeDetail(recipe)}>
                    <Text style={styles.readMoreButtonText}><FontAwesomeIcon icon={faEye} style={styles.readMoreButtonText} /> Read More...</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}

export default RecipesCard;