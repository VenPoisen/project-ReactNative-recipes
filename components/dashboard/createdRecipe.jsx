import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SHADOWS } from '../../constants/theme';
import styles from './createdRecipe.style';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendarAlt, faLayerGroup, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
const RecipeCard = ({ recipe, onEdit, onDelete }) => {
    return (
        <View style={SHADOWS.medium}>
            <View style={styles.cardContainer}>
                <TouchableOpacity>
                    <Image source={{ uri: recipe.cover }} style={styles.recipeImage} />
                </TouchableOpacity>
                <View style={styles.recipeDescriptionContainer}>
                    <Text style={styles.recipeTitle}>{recipe.title}</Text>
                    <View style={styles.recipeContainer}>
                        <Text style={styles.recipeDateText}>
                            <FontAwesomeIcon icon={faCalendarAlt} style={styles.recipeDateText} /> {recipe.created_at}
                        </Text>
                        <TouchableOpacity>
                            <Text style={styles.recipeLinkableInfoText}>
                                <FontAwesomeIcon icon={faLayerGroup} style={styles.recipeLinkableInfoText} /> {recipe.category}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.recipeButtonContainer}>
                    <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={() => onDelete(recipe.id)}>
                        <Text style={styles.buttonText}><FontAwesomeIcon icon={faTrash} style={styles.buttonText} /> Delete</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.editButton]} onPress={() => onEdit(recipe.id)}>
                        <Text style={styles.buttonText}><FontAwesomeIcon icon={faEdit} style={styles.buttonText} /> Edit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default RecipeCard;