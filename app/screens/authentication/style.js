import { StyleSheet } from 'react-native';
import config from '@config/config'
import colors from '@res/colors';

export default StyleSheet.create({
    container: {
        flex: 1,
        height: config.deviceHeight,
        width: config.deviceWidth,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        height: config.deviceHeight * 0.1,
        width: config.deviceWidth * 0.6,
        marginBottom: config.deviceHeight * 0.05
    },
    signUpBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: config.deviceHeight * 0.03
    },
    heading: {
        color: 'white',
        fontSize: 35
    },
    card: {
        height: config.deviceHeight * 0.35,
        width: config.deviceWidth * 0.65,
        borderRadius: 10,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'white',
        elevation: 20
    },
    cardText: {
        fontSize: 25,
        marginTop: config.deviceHeight * 0.03,
        marginBottom: config.deviceHeight * 0.02,
        color: colors.primary_blue
    },
    whiteSpace: {
        height: config.deviceHeight * 0.05
    },
    // pageView: {
    //     height: config.deviceHeight * 0.35,
    //     width: config.deviceWidth,
    //     backgroundColor: colors.primary_blue,
    // },
    headingView: {
        height: config.deviceHeight * 0.05,
        width: config.deviceWidth,
        position: 'absolute',
        top: config.deviceHeight * 0.03,
        left: 30
    },
    bodyContainer: {
        justifyContent: 'center',
        height: config.deviceHeight,
        marginTop: config.deviceHeight * 0.1,
        alignItems: 'center'
    },
    pageContainer: {
        flex: 1,
        flexDirection: 'column'

    },
    topContainer: {
        flex: 0.35,
        backgroundColor: colors.primary_blue,
    },
    bottomContainer: {
        flex: 0.65,
        backgroundColor: colors.white

    },
    middleContainer: {
        position: 'absolute',
        width: config.deviceWidth,
        height: config.deviceHeight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pickerView: {
        height: config.deviceHeight*0.06,
        width: config.deviceWidth*0.8,
        marginTop: config.deviceHeight*0.01,
        borderWidth: 1,
        borderColor: colors.cornflowerblue,
        borderRadius: 5,
        justifyContent:'center'
    }

});