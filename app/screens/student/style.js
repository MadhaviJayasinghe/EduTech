import { StyleSheet } from 'react-native';
import config from '@config/config'
import colors from '@res/colors';

export default StyleSheet.create({
    container: {
        flex: 1,
        height: config.deviceHeight,
        width: config.deviceWidth,
        justifyContent: 'center',
        backgroundColor: colors.primary_blue
    },
    middleContainer: {
        height: config.deviceHeight * 0.55,
        marginTop: config.deviceHeight * 0.07,
        width: config.deviceWidth,
        backgroundColor: colors.white
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        height: config.deviceHeight * 0.2,
        width: config.deviceWidth,
        backgroundColor: colors.primary_blue
    },
    largeButton: {
        flex: 2 / 3,
        height: config.deviceHeight * 0.18,
        elevation: 20
    },
    smallButton: {
        flex: 1 / 3,
        height: config.deviceHeight * 0.18,
        elevation: 20,
        justifyContent: 'center'
    },
    space: {
        flex: 0.01
    },
    pageContainer: {
        position: 'absolute',
        width: config.deviceWidth,
        height: config.deviceHeight * 0.7,
        marginTop: config.deviceHeight * 0.25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    card: {
        height: config.deviceHeight * 0.35,
        width: config.deviceWidth * 0.8,
        borderRadius: 10,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'white',
        elevation: 10,
        marginTop: config.deviceHeight * 0.02
    },
    image: {
        height: config.deviceHeight * 0.35,
        width: config.deviceWidth * 0.8,
        borderRadius: 10,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    cardTextSmall: {
        fontSize: 15,
        marginTop: config.deviceHeight * 0.03,
        color: colors.primary_blue
    },
    cardTextLarge: {
        fontSize: 25,
        marginBottom: config.deviceHeight * 0.02,
        color: colors.primary_blue
    },
    pickerView: {
        height: config.deviceHeight * 0.06,
        width: config.deviceWidth * 0.8,
        marginTop: config.deviceHeight * 0.02,
        borderWidth: 1,
        borderColor: colors.cornflowerblue,
        borderRadius: 5,
        justifyContent: 'center'
    },
    flatlist: {
        marginTop: config.deviceHeight * 0.02,
        borderColor: 'red'
    },
    classCard: {
        padding: 10,
        width: config.deviceWidth * 0.45,
        height: config.deviceHeight * 0.24,
        margin: 5,
        borderRadius: 5,
        marginBottom: config.deviceWidth * 0.03,
        elevation: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardTextMedium: {
        fontSize: 18,
        color: colors.primary_blue,
        marginTop: -config.deviceHeight * 0.02
    },
    cardLecture: {
        padding: 10,
        borderColor: colors.primary_blue,
        borderWidth: 1.5,
        width: config.deviceWidth * 0.9,
        borderRadius: 5,
        marginBottom: config.deviceWidth * 0.03
    },
    mediumButton: {
        flex: 0.5,
        height: config.deviceHeight * 0.18,
        elevation: 20
    },
    requestCard: {
        height: config.deviceHeight * 0.1,
        width: config.deviceWidth * 0.9,
        marginTop: config.deviceHeight * 0.01,
        borderRadius: 10,
        justifyContent: 'center',
        padding: config.deviceWidth * 0.03,
        backgroundColor: 'white',
        elevation: 10
    },
    welcome: {
        fontSize: 26,
        color: colors.white,
        marginLeft: 5,
        textAlign: 'right'
    },
    greeting: {
        fontWeight: '500',
        fontSize: 50,
        color: colors.white,
        marginLeft: 5,
        textAlign: 'right',
        marginTop: -20
    },
    largeIcon: {
        alignSelf: 'center',
        marginTop: 15,
        marginBottom: 15
    },
    buttonText: {
        fontSize: 16,
        color: colors.white,
        marginLeft: 5
    },
    smallIcon: {
        alignSelf: 'center'
    },
    mediumIcon: {
        alignSelf: 'center',
        marginTop: 25,
        marginBottom: 25
    },
    icon: {
        alignSelf: 'center',
        marginTop: 25,
        marginBottom: 5
    },
    bottomText: {
        fontSize: 26,
        color: colors.white,
        marginLeft: 15,
        textAlign: 'left',
        marginTop: 50
    }
});