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

    const handleRecipeDetail = (recipeId) => {
        // Navegar para a tela de detalhes da receita com o ID fornecido
        router.push(`/recipeDetail/${recipeId}`)
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.white} />

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={SHADOWS.medium} id='1'>
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
                        <TouchableOpacity style={styles.readMoreButton} onPress={handleRecipeDetail}>
                            <Text style={styles.readMoreButtonText}><FontAwesomeIcon icon={faEye} style={styles.readMoreButtonText} /> Read More...</Text>
                        </TouchableOpacity>
                    </View>
                </View>

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
                        <TouchableOpacity style={styles.readMoreButton} onPress={handleRecipeDetail}>
                            <Text style={styles.readMoreButtonText}><FontAwesomeIcon icon={faEye} style={styles.readMoreButtonText} /> Read More...</Text>
                        </TouchableOpacity>
                    </View>
                </View>

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
                        <TouchableOpacity style={styles.readMoreButton}>
                            <Text style={styles.readMoreButtonText}><FontAwesomeIcon icon={faEye} style={styles.readMoreButtonText} /> Read More...</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView >
    );
};

export default HomeScreen;
