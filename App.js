import React from "react"
import { StatusBar, Alert, Text, FlatList, View, ActivityIndicator, StyleSheet, ImageBackground, Image, TextInput } from "react-native";
import axios from 'axios';
import { Header } from "./components/Header";
import { GlobalStyles } from "./styles/GlobalStyles";
import { LinearGradient } from "expo-linear-gradient";
import { QuestionInput } from "./components/QuestionInput";
import { SideMenu } from "./components/SideMenu";
import { Chat } from "./components/Chat";
import { Images } from "./tools/Images";

export default function App() {
  const [data, setData] = React.useState(); // Данные для ответа
  const [isChat, setIsChat] = React.useState(true); // Страница с чатом
  const [isAnswering, setIsAnswering] = React.useState(false); // Бот в состоянии ответа
  const [questionText, setQuestionText] = React.useState(""); // Текст вопроса
  const [messages, setMessages] = React.useState([]); // Сообщения в чате

  const fetchData = () => {
    axios
      .get('https://amock.io/api/fakeaccount/urfu-questionnaire/data')
      .then(({ data }) => {
        setData(data);
      }).catch(err => {
        console.log(err);
        Alert.alert("Ошибка", "Ошибка при получении данных")
      });
  };

  React.useEffect(fetchData, []);

  const addMessage = (text, sender) => {
    var gradient = getRandomItem(gradients);
    const newMessage = {
      text: text,
      sender: sender,
      gradient: gradient
    };
    setMessages(prevState => [newMessage, ...prevState]);
  };

  const addAnswer = () => {
    setIsAnswering(true);
    const words = questionText.toLowerCase().split(' ');
    let maxMatches = 0;
    let answers = [];
    let topic = ''

    if (data) {
      for (const area of data) {
        for (const subTopic of area.innerTopics) {
          const foundWords = words.filter(word => subTopic.keyWords.includes(word));
          if (foundWords.length > maxMatches) {
            maxMatches = foundWords.length;
            answers = subTopic.answers;
            topic = subTopic.topic;
          }
        }
      }
    }

    if (answers.length !== 0) {
      for (let i = 0; i < answers.length; i++) {
        let answer = answers[i];
        if (i === 0) {
          answer = topic + ':\n' + answer;
        }
        addMessage(answer, "robot");
      }
    }
    else {
      addMessage(defaultNoAnswer, "robot");
    }
    setIsAnswering(false);
  }

  const sendQuestion = () => {
    if (questionText.length === 0) {
      return;
    }
    addMessage(questionText, "user");
    addAnswer();
    setQuestionText("");
  };

  const changeSideMenuState = () => {
    setIsChat(!isChat);
  }

  if (messages.length === 0) {
    addMessage("Я бот Вопросник УрФУ, помогу найти ответ на твой вопрос", "robot");
  }

  return (
    <ImageBackground style={styles.page} source={Images.main.background} resizeMode="cover">
      <StatusBar backgroundColor="#e40b76" />
      <Header isChat={isChat} changeSideMenuState={changeSideMenuState} />
      {
        isChat
          ? (
            <View style={styles.body}>
              <Chat messages={messages} />
            </View>)
          : null
      }
      {
        isChat
          ? (
            <QuestionInput lineCount={2} lineHeight={39} questionText={questionText}
              onChangeText={setQuestionText} sendQuestion={sendQuestion} isAnswering={isAnswering}
            />)
          : null
      }
      {
        !isChat
          ? (
            <SideMenu data={data} />
          )
          : null
      }
    </ImageBackground>);
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  body: {
    flexGrow: 1
  }
});

const gradients = [
  ['#B76CD2', '#7E319A'],
  ['#6578DF', '#4C5AA5'],
  ['#FFDB1B', '#EEAF0E'],
  ['#F0B167', '#E34D30']
];

const getRandomItem = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  const selectedRandomItem = array[randomIndex];
  return selectedRandomItem;
};

const defaultNoAnswer = "Извините, ответ на ваш вопрос не найден.";