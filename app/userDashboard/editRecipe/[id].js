import { useState } from "react";
import { ScrollView, Text, View, TextInput, TouchableOpacity, SafeAreaView, Modal, Alert, Image, KeyboardAvoidingView } from "react-native";
import { useNavigation } from "expo-router";
import { CommonActions } from "@react-navigation/native";
import { Picker } from '@react-native-picker/picker'
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import axios from "axios";
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowDown, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";

import { COLORS, SHADOWS } from "../../../constants/theme";
import styles from "../../../components/dashboard/editRecipe";
import { sendImageToAPI } from "../../../utils/sendImageToAPI";

import { BASE_URL } from "@env";

const baseUrl = BASE_URL

const optionsPreparationUnit = ['minutes', 'hour', 'seconds'];
const optionsServingsUnit = ['people', 'g', 'mL', 'slice', 'portion'];

const EditRecipe = ({ route }) => {
    const navigation = useNavigation();

    const recipe_id = route.params.id;
    const recipe = route.params.recipe;

    const tags = route.params.tags.sort((a, b) => a.name.localeCompare(b.name));
    const [selectedTagValue, setSelectedTagValue] = useState('');
    const [tag, setTag] = useState([]);

    const [isErrorImage, setIsErrorImage] = useState(false);

    const [isPickerPrepVisible, setIsPickerPrepVisible] = useState(false);
    const [isPickerServVisible, setIsPickerServVisible] = useState(false);
    const [isPickerTagsVisible, setIsPickerTagsVisible] = useState(false);

    const [formData, setFormData] = useState({
        'title': recipe.title,
        'description': recipe.description,
        'tags': recipe.tags,
        'tag_objects': recipe.tag_objects,
        'preparation_time': recipe.preparation_time,
        'preparation_time_unit': recipe.preparation_time_unit,
        'servings': recipe.servings,
        'servings_unit': recipe.servings_unit,
        'preparation_steps': recipe.preparation_steps,
        'cover': recipe.cover,
    });

    const resetNavigation = () => {
        const resetAction = CommonActions.reset({
            index: 0,
            routes: [{ name: 'dashboard' }],
        });
        navigation.dispatch(resetAction);
    };

    const addTag = () => {
        const filtTag = tags.filter((tag) => tag.name.includes(selectedTagValue))

        if (!tag.includes(filtTag[0]) && !formData['tags'].includes(filtTag[0].id)) {
            setTag([...tag, filtTag[0]]);
            setFormData(prevData => ({
                ...prevData,
                'tags': [...prevData.tags, filtTag[0].id]
            }));
        }
    };

    const removeTag = (tagId) => {
        const formFilteredTags = formData['tag_objects'].filter((tag) => tag.id !== tagId);
        const filteredTags = tag.filter((tag) => tag.id !== tagId);

        setTag(filteredTags);
        setFormData(prevData => ({
            ...prevData,
            'tag_objects': formFilteredTags,
            'tags': [...formFilteredTags, ...filteredTags].map((tag) => tag.id),
        }));
    };

    /**
     * pickImage use ImagePicker to let you select an image from gallery.
     */
    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            Alert.alert('Permission to access library denied');
            return;
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        if (!result.canceled) {
            const { uri, fileName, type } = result.assets[0];
            sendImageToAPI(uri, fileName, type, recipe_id, setIsErrorImage);

            if (!isErrorImage) {
                setFormData(prevData => ({
                    ...prevData,
                    'cover': result.assets[0].uri,
                }));
            }
        }
    };

    /**
     * This handles the picker selector for preparation_time, servings_unit
     * and tags from formData.
     */
    const handlePickerOpen = (param) => {
        if (param === "preparation") {
            setIsPickerPrepVisible(true);
        } else if (param === "servings") {
            setIsPickerServVisible(true);
        } else if (param === "tags") {
            setIsPickerTagsVisible(true);
        }
    };

    const handlePickerClose = () => {
        setIsPickerPrepVisible(false);
        setIsPickerServVisible(false);
        setIsPickerTagsVisible(false);
    };

    /**
     * Adds selected data to formData
     * @param {string} name - Name of the formData field to be update. 
     */
    const handleInputChange = (name, value) => {
        if (name === "tags") {
            setSelectedTagValue(value)
        } else {
            setFormData(prevData => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    /**
     * Filters numeric inputs on the edit form to accept only integer numbers.
     */
    const handleInputBlur = (name, value) => {
        if (isNaN(value) || value === '') {
            setFormData(prevData => ({
                ...prevData,
                [name]: recipe[name],
            }));
            Alert.alert("Error", "You need to pass an integer number")
        } else {
            const numberTime = parseInt(value)
            setFormData(prevData => ({
                ...prevData,
                [name]: numberTime,
            }));
        }
    }

    const handleUpdate = async () => {
        try {
            const token = await SecureStore.getItemAsync('accessToken')
            const updatedFields = {};

            for (const field in formData) {
                if (formData[field] !== recipe[field]) {
                    updatedFields[field] = formData[field];
                }
            }
            delete updatedFields['tag_objects'];

            // Needs this because maxLength not currently working on 
            // react-native@0.71.8 and expo@48.0.7
            if (formData["description"].length > 165) {
                Alert.alert(
                    'Your description cannot be longer than 165 characters',
                    `Current characters -> ${formData["description"].length}`
                );
                return;
            }

            const response = await axios.patch(
                `${baseUrl}v2/${recipe_id}/`,
                updatedFields,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            )
            if (response.status === 200) {
                Alert.alert('Your recipe has been updated');
                resetNavigation();
            } else {
                Alert.alert(
                    'Error updating the recipe, try again: status code',
                    response.status
                );
            }
        } catch (error) {
            console.error('Error updating the recipe:', error);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.buttonDark }}>
            <ScrollView
                style={{ flex: 1, backgroundColor: COLORS.white }}
            >
                <TouchableOpacity>
                    <View style={[SHADOWS.medium, styles.containerImg]}>
                        <Image
                            source={{ uri: formData['cover'] }}
                            style={styles.recipeImage}
                        />
                    </View>
                </TouchableOpacity>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={pickImage} style={[SHADOWS.small, styles.addButton]}>
                        <Text style={styles.addButtonText}>Change Image</Text>
                    </TouchableOpacity>
                </View>
                <View style={[SHADOWS.medium, styles.container]}>
                    <Text style={styles.text}>Title</Text>
                    <TextInput
                        style={styles.input}
                        maxLength={65}
                        placeholder="Title"
                        placeholderTextColor={COLORS.gray}
                        value={formData['title']}
                        onChangeText={value => handleInputChange('title', value)}
                    />

                    <Text style={styles.text}>Description</Text>
                    {/* maxLength with multiline=true is auto-completing the value.
                    Need to wait for a fix version of react-native, before applying */}
                    <TextInput
                        style={styles.input}
                        multiline={true}
                        // maxLength={165}
                        numberOfLines={4}
                        placeholder="Description"
                        placeholderTextColor={COLORS.gray}
                        value={formData["description"]}
                        onChangeText={value => handleInputChange('description', value)}
                    />

                    <Text style={styles.text}>Tags</Text>
                    <ScrollView contentContainerStyle={styles.tagsContainer} horizontal={true} showsHorizontalScrollIndicator={false}>
                        {[...formData['tag_objects'], ...tag].map((tag, index) => (
                            <View key={index} style={styles.tagItem}>
                                <Text style={styles.tagText}>{tag.name}</Text>
                                <TouchableOpacity
                                    style={{ marginLeft: 6 }}
                                    onPress={() => removeTag(tag.id)}
                                >
                                    <FontAwesomeIcon
                                        icon={faXmarkCircle}
                                        color={COLORS.buttonDark}
                                    />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>
                    <TouchableWithoutFeedback onPress={() => handlePickerOpen("tags")} style={styles.input}>
                        <View style={styles.inputToModal}>
                            <TextInput
                                placeholder="Select New Tag"
                                placeholderTextColor={COLORS.gray}
                                value={selectedTagValue}
                                editable={false}
                            />
                            <FontAwesomeIcon
                                icon={faArrowDown}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                    <Modal visible={isPickerTagsVisible} animationType="slide" transparent={true} onRequestClose={handlePickerClose}>
                        <TouchableWithoutFeedback onPress={handlePickerClose}>
                            <View style={[SHADOWS.medium, styles.modalView]}>
                                <Picker
                                    selectedValue={selectedTagValue}
                                    onValueChange={(value) => handleInputChange('tags', value)}
                                >
                                    {tags.map((tag) => (
                                        <Picker.Item key={tag.id} label={tag.name} value={tag.name} />
                                    ))}
                                </Picker>
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>
                    <TouchableOpacity
                        style={[SHADOWS.small, styles.addButton]}
                        onPress={addTag}
                    >
                        <Text style={styles.addButtonText}>Add new Tag</Text>
                    </TouchableOpacity>

                    <Text style={styles.text}>Preparation Time</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        placeholder="preparation Time"
                        placeholderTextColor={COLORS.gray}
                        value={formData["preparation_time"].toString()}
                        onChangeText={value => handleInputChange('preparation_time', value)}
                        onBlur={value => handleInputBlur("preparation_time", value.nativeEvent.text)}
                    />

                    <Text style={styles.text}>Preparation Time Unit</Text>
                    <TouchableWithoutFeedback onPress={() => handlePickerOpen("preparation")} style={styles.input}>
                        <View style={styles.inputToModal}>
                            <TextInput
                                placeholder="Selecione uma opção"
                                value={formData["preparation_time_unit"]}
                                editable={false}
                            />
                            <FontAwesomeIcon
                                icon={faArrowDown}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                    <Modal visible={isPickerPrepVisible} animationType="slide" transparent={true} onRequestClose={handlePickerClose}>
                        <TouchableWithoutFeedback onPress={handlePickerClose}>
                            <View style={[SHADOWS.medium, styles.modalView]}>
                                <Picker
                                    selectedValue={formData["preparation_time_unit"]}
                                    onValueChange={value => handleInputChange('preparation_time_unit', value)}
                                >
                                    {optionsPreparationUnit.map((option, index) => (
                                        <Picker.Item key={index} label={option} value={option} />
                                    ))}
                                </Picker>
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>
                    <Text style={styles.text}>Servings</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        placeholder="Servings"
                        placeholderTextColor={COLORS.gray}
                        value={formData["servings"].toString()}
                        onChangeText={value => handleInputChange('servings', value)}
                        onBlur={value => handleInputBlur("servings", value.nativeEvent.text)}
                    />
                    <Text style={styles.text}>Servings Unit</Text>
                    <TouchableWithoutFeedback onPress={() => handlePickerOpen("servings")} style={styles.input}>
                        <View style={styles.inputToModal}>
                            <TextInput
                                placeholder="Selecione uma opção"
                                value={formData["servings_unit"]}
                                editable={false}
                            />
                            <FontAwesomeIcon
                                icon={faArrowDown}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={styles.modalContainer}>
                        <Modal visible={isPickerServVisible} animationType="slide" transparent={true} onRequestClose={handlePickerClose}>
                            <TouchableWithoutFeedback onPress={handlePickerClose}>
                                <View style={[SHADOWS.medium, styles.modalView]}>
                                    <Picker
                                        selectedValue={formData["servings_unit"]}
                                        onValueChange={value => handleInputChange('servings_unit', value)}
                                    >
                                        {optionsServingsUnit.map((option, index) => (
                                            <Picker.Item key={index} label={option} value={option} />
                                        ))}
                                    </Picker>
                                </View>
                            </TouchableWithoutFeedback>
                        </Modal>
                    </View>
                    <Text style={styles.text}>Preparation Steps</Text>
                    <TextInput
                        style={styles.input}
                        multiline={true}
                        numberOfLines={20}
                        placeholder="Preparation Steps"
                        placeholderTextColor={COLORS.gray}
                        value={formData["preparation_steps"]}
                        onChangeText={value => handleInputChange('preparation_steps', value)}
                    />
                    <TouchableOpacity onPress={handleUpdate} style={[SHADOWS.small, styles.updateButton]}>
                        <Text style={styles.updateText}>UPDATE RECIPE</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </SafeAreaView>
    )

}

export default EditRecipe;