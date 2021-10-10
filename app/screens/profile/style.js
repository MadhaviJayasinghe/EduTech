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
    image: {
        height: config.deviceWidth * 0.4,
        width: config.deviceWidth * 0.4,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        marginBottom: config.deviceHeight*0.03
    },
    pageContainer: {
        position: 'absolute',
        width: config.deviceWidth,
        height: config.deviceHeight * 0.7,
        marginTop: config.deviceHeight * 0.25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        backgroundColor: 'white',
        width: config.deviceWidth * 0.8,
        borderRadius: 5,
        fontSize: 16,
        color: colors.primary_blue,
        paddingLeft: config.deviceWidth * 0.03,
        margin: config.deviceHeight * 0.01
    },
    label: {
        margin: config.deviceHeight * 0.01,
        fontWeight: 'bold',
        color: colors.primary_blue
    },
    logout: {
        height: config.deviceWidth * 0.1,
        width: config.deviceWidth * 0.3,
        alignSelf: 'flex-end',
        marginTop: config.deviceHeight * 0.1,
        marginBottom: -config.deviceHeight * 0.1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    logoutText: {
        fontSize: 16,
        color: 'red',
        marginLeft: 10,
        alignSelf: 'center'
    }
})