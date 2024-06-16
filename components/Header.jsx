import { LinearGradient } from 'expo-linear-gradient';
import { Text, Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import { GlobalStyles } from '../styles/GlobalStyles';
import { Images } from "../tools/Images";

export const Header = ({ isChat, changeSideMenuState }) => {
    return (
        <LinearGradient style={styles.header} colors={['#e40b76', '#f7b008']} start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}>
            <View style={styles.headerMainContainer}>
                <TouchableOpacity onPress={changeSideMenuState}>
                    {isChat && <Image source={Images.main.openMenuIcon} />}
                    {!isChat && <Image source={Images.main.closeMenuIcon} />}
                </TouchableOpacity>
                <Text style={[GlobalStyles.text, styles.headerTitle]}>Бот Вопросник УрФУ</Text>
            </View>
            <View style={styles.headerIconContainer}>
                <Image style={styles.headerIcon} source={Images.main.urfuLogo} />
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row'
    },
    headerIconContainer: {
        textAlign: 'right',
        padding: 5
    },
    headerMainContainer: {
        flex: 1,
        marginTop: 5,
        marginHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth: 2.5,
        borderTopColor: 'white'
    },
    headerTitle: {
        fontSize: 22,
        paddingHorizontal: 15
    }
});