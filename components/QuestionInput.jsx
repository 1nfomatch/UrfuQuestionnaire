import React from "react"
import { View, TextInput, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { GlobalStyles } from "../styles/GlobalStyles";
import { Images } from "../tools/Images";
import { Constants } from "../tools/Constants";

export const QuestionInput = ({ lineCount, lineHeight, questionText,
    onChangeText, sendQuestion, isAnswering }) => {
    const [height, setHeight] = React.useState(0);
    const refInput = React.useRef(null);
    const [isAskButtonClicked, setIsAskButtonClicked] = React.useState(false);

    // Обработка увеличения высоты TextInput
    const handleContentSizeChange = (event) => {
        const { contentSize } = event.nativeEvent;
        setHeight(contentSize.height);
    };

    const handleSendQuestion = () => {
        if (refInput.current) {
            refInput.current.blur();
        }
        sendQuestion();
    }

    // Открытие ввода вопроса при нажатии на кнопку спросить
    if (!Constants.isChatStarted && isAskButtonClicked && refInput.current) {
        Constants.isChatStarted = true;
        refInput.current.focus();
    }

    if (questionText.length === 0 && height !== lineHeight) {
        setHeight(lineHeight);
    }

    return (
        !Constants.isChatStarted && !isAskButtonClicked && questionText.length === 0 ? (
            <View style={styles.footer}>
                <Text style={styles.footer_hint_text}>Чтобы задать мне вопрос,</Text>
                <Text style={styles.footer_hint_text}>нажми на кнопку “спросить”</Text>
                <Image source={Images.chat.pointerIcon} />
                <LinearGradient
                    style={styles.ask_button}
                    colors={['#EE6282', '#FBD8A9']}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}>
                    <TouchableOpacity
                        onPress={() => setIsAskButtonClicked(true)}
                        style={styles.ask_button_touchable}>
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
                <TouchableOpacity onPress={handleSendQuestion} disabled={isAnswering}>
                    <Image
                        style={[isAnswering ? styles.disabledQuestionIcon : styles.questionIcon]}
                        source={require("../assets/images/QuestionIcon.png")} />
                </TouchableOpacity>
            </View>
        )
    );
};

const styles = StyleSheet.create({
    questionInputContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center'
    },
    questionInput: {
        textAlignVertical: 'top',
        padding: 10,
        flex: 1
    },
    disabledQuestionIcon: {
        tintColor: 'black',
        margin: 5,
        opacity: 0.3
    },
    questionIcon: {
        tintColor: 'black',
        margin: 5
    },
    footer: {
        alignItems: 'center',
        paddingBottom: '10%'
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
        marginLeft: 10
    }
});