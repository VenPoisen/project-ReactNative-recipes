import { useState } from "react";
import { ScrollView, Text, View, TextInput, TouchableOpacity, SafeAreaView, Modal, Alert, Image } from "react-native";
import { useNavigation } from "expo-router";
import { CommonActions } from "@react-navigation/native";
import { Picker } from '@react-native-picker/picker'
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import * as ImagePicker from 'expo-image-picker';

import { COLORS, SHADOWS } from "../../../constants/theme";
import styles from "../../../components/dashboard/editRecipe";
import { sendImageToAPI } from "../../../utils/sendImageToAPI";

const optionsPreparationUnit = ['minutes', 'hour', 'seconds'];
const optionsServingsUnit = ['people', 'g', 'mL', 'slice', 'portion'];

const EditRecipe = ({ route }) => {
    const recipe_id = route.params.id
    const recipe = route.params.recipe

    const [tag, setTag] = useState('');
    const [isErrorImage, setIsErrorImage] = useState(false);

    const [isPickerPrepVisible, setIsPickerPrepVisible] = useState(false);
    const [isPickerServVisible, setIsPickerServVisible] = useState(false);

    const [formData, setFormData] = useState({
        'title': recipe.title,
        'description': recipe.description,
        'tag_objects': recipe.tag_objects,
        'preparation_time': recipe.preparation_time,
        'preparation_time_unit': recipe.preparation_time_unit,
        'servings': recipe.servings,
        'servings_unit': recipe.servings_unit,
        'preparation_steps': recipe.preparation_steps,
        'cover': recipe.cover,
    });

    const addTag = () => {
        if (tag.trim() !== '') {
            const tagObj = {
                "name": tag
            }
            setFormData(prevData => ({
                ...prevData,
                tag_objects: [...prevData.tag_objects, tagObj],
            }));
            setTag('');
        }
    };

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            console.log('Permission to access library denied');
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

    const handleInputChange = (name, value) => {
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

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

    const handlePickerOpen = (param) => {
        if (param === "preparation") {
            setIsPickerPrepVisible(true);
        } else if (param === "servings") {
            setIsPickerServVisible(true);
        }
    };

    const handlePickerClose = () => {
        setIsPickerPrepVisible(false);
        setIsPickerServVisible(false);
    };


    const handleUpdate = async () => {
    };

    return (
        <SafeAreaView>
            <ScrollView

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
                        {formData["tag_objects"].map((tag, index) => (
                            <View key={index} style={styles.tagItem}>
                                <Text style={styles.tagText}>{tag.name}</Text>
                            </View>
                        ))}
                    </ScrollView>
                    <TextInput
                        style={styles.input}
                        placeholder="New Tag"
                        placeholderTextColor={COLORS.gray}
                        value={tag}
                        onChangeText={setTag}
                    />
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
                        <View>
                            <TextInput
                                placeholder="Selecione uma opção"
                                value={formData["preparation_time_unit"]}
                                editable={false}
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
                        <View>
                            <TextInput
                                placeholder="Selecione uma opção"
                                value={formData["servings_unit"]}
                                editable={false}
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