import { StyleSheet } from 'react-native';
import config from '@config/config'
import colors from '@res/colors';

export default StyleSheet.create({
    textInput: {
        borderColor: colors.cornflowerblue,
        borderWidth: 1,
        width: config.deviceWidth * 0.8,
        borderRadius: 5,
        paddingLeft: config.deviceWidth * 0.03,
        margin: config.deviceHeight * 0.01
    },
    pageContainer: {
        flex: 1,
        flexDirection: 'column'
    },
    topContainer: {
        flex: 0.25,
        backgroundColor: colors.primary_blue
    },
    bottomContainer: {
        flex: 0.75
    },
    headingView: {
        height: config.deviceHeight * 0.2,
        width: config.deviceWidth,
        top: config.deviceHeight * 0.03,
        left: 30
    },
    heading: {
        color: 'white',
        fontSize: 30,
        marginTop: config.deviceHeight * 0.01
    },
    button: {
        borderColor: colors.primary_blue,
        backgroundColor: colors.primary_blue,
        borderWidth: 1.5,
        width: config.deviceWidth * 0.7,
        height: config.deviceHeight * 0.07,
        borderRadius: 10,
        marginTop: config.deviceHeight * 0.05,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 25
    },
    buttonText: {
        color: colors.white,
        fontSize: 16
    }
});