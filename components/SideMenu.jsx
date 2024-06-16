import { LinearGradient } from "expo-linear-gradient"
import { TouchableOpacity, View, StyleSheet, Image, Text, FlatList } from "react-native"
import { Images } from "../tools/Images";
import React from "react";

export const SideMenu = ({ data }) => {
    const questionTabButtonInfo = {
        text: "Часто задаваемые вопросы",
        image: Images.sideMenu.questionIcon,
        clickAction: () => setupQuestionsTab(questionTabButtonInfo, { innerTopics: data }),
        isMain: true,
        isLast: false
    };

    const aboutTabButtonInfo = {
        text: "О боте Вопросник",
        image: Images.sideMenu.aboutIcon,
        clickAction: () => setupAboutTab(),
        isMain: true,
        isLast: false
    };

    const feedbackTabButtonInfo = {
        text: "Обратная связь",
        image: Images.sideMenu.feedbackIcon,
        clickAction: () => setupFeedbackTab(),
        isMain: true,
        isLast: false
    };

    const defaultMenuElements = [questionTabButtonInfo, aboutTabButtonInfo, feedbackTabButtonInfo];

    const [menuElements, setMenuElements] = React.useState(defaultMenuElements)

    const resetMenu = () => {
        setMenuElements(defaultMenuElements);
    }

    const setupAboutTab = () => {
        const aboutInfoView = {
            text: '«Бот-вопросник» - это чат-бот, который помогает студентам быстро найти ответы на вопросы, касаемые учебы в ВУЗе, проживания, научной деятельности, творчества и прочих сфер жизни в университете'
        }
        const updatedAboutTabButtonInfo = {
            ...aboutTabButtonInfo,
            isLast: true,
            clickAction: resetMenu
        };
        setMenuElements([updatedAboutTabButtonInfo, aboutInfoView]);
    };

    const setupFeedbackTab = () => {
        const feedbackInfoView = {
            text: 'Контакты для обратной связи\nhttps://urfu.ru/ru/'
        }
        const updatedFeedbackTabButtonInfo = {
            ...feedbackTabButtonInfo,
            isLast: true,
            clickAction: resetMenu
        };
        setMenuElements([updatedFeedbackTabButtonInfo, feedbackInfoView]);
    };

    const setupQuestionsTab = (topicDescription, topic) => {
        let updatedQuestionTabButtonInfo = {
            ...topicDescription,
            isMain: true,
            isLast: true,
            clickAction: resetMenu
        };
        let elements = [];

        if (topic.innerTopics) {
            for (let i = 0; i < topic.innerTopics.length; i++) {
                const question = topic.innerTopics[i];
                const questionTabButtonInfo = {};

                questionTabButtonInfo.isLast = false;
                questionTabButtonInfo.text = question.topic;
                questionTabButtonInfo.clickAction = () => setupQuestionsTab(questionTabButtonInfo, question);
                elements = [...elements, questionTabButtonInfo];
            }
        }

        if (topic.answers) {
            for (let j = 0; j < topic.answers.length; j++) {
                const answer = topic.answers[j];
                const answerInfoView = {
                    text: answer
                };
                elements = [...elements, answerInfoView];
            }
        }
        setMenuElements([updatedQuestionTabButtonInfo, ...elements]);
    };

    const renderMenuButton = ({ item }) => {
        const position = item.isMain ? 'flex-start' : 'flex-end';
        const conditionalStyles = item.isMain ? [styles.menuButtonGradient, { flexGrow: 1 }] : [styles.menuButtonGradient];

        return (
            <View style={[styles.menuButtonContainer, { justifyContent: position }]}>
                <LinearGradient
                    style={conditionalStyles}
                    colors={['#EE6282', '#FBD8A9']}
                    start={{ x: 0.5, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}>
                    <TouchableOpacity onPress={item.clickAction} style={styles.menuButtonTouchable} disabled={item.isLast === undefined}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            {item.image && <Image source={item.image} style={styles.menuButtonIcon} />}
                            <Text style={styles.menuButtonText}>{item.text}</Text>
                        </View>
                        {item.isLast !== undefined && !item.isLast && <Image source={Images.sideMenu.arrowRightIcon} />}
                        {item.isLast !== undefined && item.isLast && <Image source={Images.sideMenu.arrowLeftIcon} />}
                    </TouchableOpacity>
                </LinearGradient>
            </View>
        );
    };

    return (
        <FlatList
            data={menuElements}
            renderItem={renderMenuButton}
            style={styles.sideMenu} />
    );
}

const styles = StyleSheet.create({
    sideMenu: {
        flex: 1,
        flexDirection: 'column'
    },
    menuButtonContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    menuButtonGradient: {
        borderRadius: 15,
    },
    menuButtonTouchable: {
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    menuButtonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10
    },
    menuButtonIcon: {
        marginLeft: 10
    }
});