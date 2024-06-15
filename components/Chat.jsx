import React, { useRef, useState } from 'react';
import { FlatList, Image, View, Text, StyleSheet } from 'react-native';

export const Chat = ({ messages }) => {
    console.log(messages);

    return (
        <View style={styles.chatContainer}>
            {messages.map((message, index) => {
                const isRobot = message.sender === "robot";
                const messageContainerStyle = isRobot ? styles.robotMessageContainer : styles.userMessageContainer;
                const messageTextStyle = isRobot ? styles.robotMessageText : styles.userMessageText;
                return (
                    <View key={index} style={messageContainerStyle}>
                        {isRobot && <Image source={require("../assets/images/RobotIcon.png")} style={styles.icon} />}
                        <Text style={messageTextStyle}>
                            {message.text}
                        </Text>
                        {!isRobot && <Image source={require("../assets/images/UserIcon.png")} style={styles.icon} />}
                    </View>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    chatContainer: {
        flex: 1,
        paddingHorizontal: 20,
    },
    robotMessageContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    userMessageContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        marginBottom: 10,
    },
    robotMessageText: {
        backgroundColor: "#d3d3d3",
        padding: 10,
        borderRadius: 10,
        marginLeft: 10,
    },
    userMessageText: {
        backgroundColor: "#add8e6",
        padding: 10,
        borderRadius: 10,
        marginRight: 10,
    },
    icon: {
        width: 30,
        height: 30,
        marginHorizontal: 5,
    },
});