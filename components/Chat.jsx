import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { FlatList, Image, View, Text, StyleSheet } from 'react-native';
import { Images } from "../tools/Images";

export const Chat = ({ messages }) => {
    const renderMessage = ({ item }) => {
        const isRobot = item.sender === "robot";
        const position = isRobot ? 'flex-start' : 'flex-end';
        return (
            <View style={[styles.messageContainer, { justifyContent: position }]}>
                {isRobot && <Image source={Images.chat.robotIcon} style={styles.messageIcon} />}
                <View style={styles.messageTextContainer}>
                    <LinearGradient
                        style={styles.messageTextGradient}
                        colors={item.gradient}
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}>
                        <Text style={styles.messageText}>
                            {item.text}
                        </Text>
                    </LinearGradient>
                </View>
                {!isRobot && <Image source={Images.chat.userIcon} style={styles.messageIcon} />}
            </View>
        )
    };

    return (
        <FlatList
            data={messages}
            renderItem={renderMessage}
            style={styles.chatContainer}
            inverted={true}
            scrollEnabled={true}
        />
    );
};

const styles = StyleSheet.create({
    chatContainer: {
        flex: 1,
        flexDirection: 'column'
    },
    messageContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        margin: 5
    },
    messageTextContainer: {
        flexGrow: 1,
        minHeight: '10%',
        maxWidth: '75%',
        borderRadius: 15,
        marginHorizontal: 10
    },
    messageTextGradient: {
        borderRadius: 15,
    },
    messageText: {
        color: 'white',
        padding: 10
    },
    messageIcon: {
        width: 70,
        height: 70,
    }
});
