import { LinearGradient } from 'expo-linear-gradient';
import { Text, Image, View, StyleSheet } from 'react-native';
import { GlobalStyles } from '../styles/global-styles';

export const Header = () => {
    return (
        <LinearGradient style={styles.header} colors={['#e40b76', '#f7b008']} start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}>
            <View style={styles.header_main_container}>
                <Image source={require("../assets/images/Menu.png")} />
                <Text style={[GlobalStyles.text, styles.header_title]}>Бот Вопросник УрФУ</Text>
            </View>
            <View style={styles.header_icon_container}>
                <Image style={styles.header_icon} source={require("../assets/images/UrfuLogo.png")} />
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        borderWidth: 3,
        borderColor: 'green'
    },
    header_icon_container: {
        textAlign: 'right',
        padding: 5
    },
    header_main_container: {
        flex: 1,
        padding: 15,
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth: 3,
        borderTopColor: 'white'
    },
    header_title: {
        fontSize: 22
    }
});