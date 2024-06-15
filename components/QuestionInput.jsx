import React from "react"
import { View, TextInput, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { GlobalStyles } from "../styles/global-styles";

export const QuestionInput = ({ lineCount, lineHeight, questionText, onChangeText }) => {
    const [height, setHeight] = React.useState(0);
    const refInput = React.useRef(null);
    const [isAskButtonClicked, setIsAskButtonClicked] = React.useState(false);
    const [isFirstTimeFocused, setIsFirstTimeFocused] = React.useState(false);

    // Обработка увеличения высоты TextInput
    const handleContentSizeChange = (event) => {
        const { contentSize } = event.nativeEvent;
        setHeight(contentSize.height);
    };

    // Открытие ввода вопроса при нажатии на кнопку спросить
    if (!isFirstTimeFocused && isAskButtonClicked && refInput.current) {
        setIsFirstTimeFocused(true);
        refInput.current.focus();
    }

    return (
        !isAskButtonClicked && questionText.length === 0 ? (
            <View style={styles.footer}>
                <Text style={styles.footer_hint_text}>Чтобы задать мне вопрос,</Text>
                <Text style={styles.footer_hint_text}>нажми на кнопку “спросить”</Text>
                <Image source={require('../assets/images/PointerIcon.png')} />
                <LinearGradient
                    style={styles.ask_button}
                    colors={['#F07688', '#FBD8A9']}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}>
                    <TouchableOpacity
                        onPress={() => setIsAskButtonClicked(true)}
                        style={styles.ask_button_touchable}
                    >
                        <Image style={styles.ask_button_icon} source={require("../assets/images/QuestionIcon.png")} />
                        <Text style={[{ paddingLeft: 5 }, GlobalStyles.text]}>СПРОСИТЬ</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>
        ) : (
            <View style={styles.questionInputContainer}>
                <TextInput
                    multiline
                    placeholder="Введите вопрос"
                    value={questionText}
                    onChangeText={onChangeText}
                    onContentSizeChange={handleContentSizeChange}
                    style={[styles.questionInput, { height: Math.min(lineCount * lineHeight, height) }]}
                    ref={refInput}
                />
                <Image style={styles.questionIcon} source={require("../assets/images/QuestionIcon.png")} />
            </View>
        )
    );
};

const styles = StyleSheet.create({
    questionInputContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
        borderWidth: 3
    },
    questionInput: {
        textAlignVertical: 'top',
        padding: 10,
        flex: 1
    },
    questionIcon: {
        tintColor: 'black',
        margin: 5
    },
    footer: {
        alignItems: 'center',
        paddingBottom: '10%',
        borderWidth: 3
    },
    footer_hint_text: {
        fontSize: 16
    },
    ask_button: {
        flexGrow: 1,
        height: '8%',
        width: '70%',
        borderRadius: 20,
        elevation: 10,
    },
    ask_button_touchable: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    ask_button_icon: {
        marginLeft: 10,
        maxHeight: '100%',
        maxWidth: '100%'
    }
});