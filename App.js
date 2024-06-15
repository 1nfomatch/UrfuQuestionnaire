import React from "react"
import { StatusBar, Alert, Text, FlatList, View, ActivityIndicator, StyleSheet, ImageBackground, Image, TextInput } from "react-native";
import axios from 'axios';
import { Header } from "./components/Header";
import { GlobalStyles } from "./styles/global-styles";
import { LinearGradient } from "expo-linear-gradient";
import { QuestionInput } from "./components/QuestionInput"

export default function App() {
  const [items, setItems] = React.useState();
  const [isChat, setIsChat] = React.useState(true);
  const [isWriting, setIsWriting] = React.useState(false);
  const [questionText, setQuestionText] = React.useState("");

  const fetchData = () => {
    axios
      .get('https://amock.io/api/fakeaccount/urfu-questionnaire/data')
      .then(({ data }) => {
        setItems(data);
      }).catch(err => {
        console.log(err);
        Alert.alert("Ошибка", "Ошибка при получении данных")
      });
  };

  React.useEffect(fetchData, []);

  {/* <FlatList
    data={items}
    renderItem={({ item }) => <Text style={[GlobalStyles.text]}>{item.topic}</Text>}
  /> */}

  return (
    <ImageBackground style={styles.page} source={require("./assets/images/Background.png")} resizeMode="cover">
      <StatusBar theme="auto" />
      <Header />
      <View style={styles.body}>
        {/* <View style={{flexDirection: 'column', width: '100%', height: 100}}>
          <View style={{backgroundColor: 'blue', height: 10}}></View>
          <View style={{backgroundColor: 'white', flexGrow: 1}}></View>
          <View style={{backgroundColor: 'green', height: 5}}></View>
        </View> */}
      </View>
      <QuestionInput lineCount={5} lineHeight={22} questionText={questionText} onChangeText={setQuestionText}/>
    </ImageBackground>);
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  body: {
    flexGrow: 1,
    borderWidth: 3,
    borderColor: 'red'
  }
});