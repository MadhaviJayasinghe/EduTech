import { StyleSheet } from 'react-native';
import config from '@config/config'

export default StyleSheet.create({
    container: {
        flex: 1,
        height: config.deviceHeight,
        width: config.deviceWidth,
        justifyContent: 'center',
        backgroundColor: '#041a5e'
    },
    middleContainer: {
        height: config.deviceHeight * 0.55,
        marginTop: config.deviceHeight * 0.07,
        width: config.deviceWidth,
        backgroundColor: '#fff'
    },
    bottomContainer: {
        height: config.deviceHeight * 0.2,
        width: config.deviceWidth,
        backgroundColor: 'red'
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        height: config.deviceHeight * 0.2,
        width: config.deviceWidth,
        backgroundColor: '#041a5e'
    },
    largeButton: {
        flex: 2 / 3,
        height: config.deviceHeight * 0.18,
        backgroundColor: '#6A00FF',
        elevation: 20
    },
    mediumButton: {
        flex: 0.5,
        height: config.deviceHeight * 0.18,
        backgroundColor: '#F0A30A',
        elevation: 20
    },
    smallButton: {
        flex: 1 / 3,
        height: config.deviceHeight * 0.18,
        backgroundColor: '#A4C400',
        elevation: 20,
        justifyContent: 'center'
    },
    largeButton1: {
        flex: 2 / 3,
        height: config.deviceHeight * 0.18,
        backgroundColor: '#008A00',
        elevation: 20
    },
    mediumButton1: {
        flex: 0.5,
        height: config.deviceHeight * 0.18,
        backgroundColor: '#1BA1E2',
        elevation: 20
    },
    smallButton1: {
        flex: 1 / 3,
        height: config.deviceHeight * 0.18,
        backgroundColor: '#FA6800',
        elevation: 20,
        justifyContent: 'center'
    },
    space: {
        flex: 0.01
    },
    pageContainer: {
        position: 'absolute',
        width: config.deviceWidth,
        height: config.deviceHeight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardLecture: {
        padding: 10,
        borderColor: '#041a5e',
        borderWidth: 1.5,
        width: config.deviceWidth * 0.9,
        borderRadius: 5,
        marginBottom: config.deviceWidth * 0.03
    },
    card: {
        height: config.deviceHeight * 0.35,
        width: config.deviceWidth * 0.65,
        borderRadius: 10,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'white',
        elevation: 10,
        marginTop: config.deviceHeight * 0.05
    },
    cardTextSmall: {
        fontSize: 15,
        marginTop: config.deviceHeight * 0.015,
        color: '#041a5e'
    },
    cardTextLarge: {
        fontSize: 25,
        color: '#041a5e'
    },
    cardTextMedium: {
        fontSize: 20,
        marginTop: config.deviceHeight * 0.03,
        color: '#041a5e'
    },
    classCard: {
        padding: 10,
        width: config.deviceWidth * 0.45,
        height: config.deviceHeight * 0.24,
        margin: 5,
        borderRadius: 5,
        marginBottom: config.deviceWidth * 0.03,
        elevation: 2,
        alignItems: 'center'
    },
    flatlist: {
        marginTop: config.deviceHeight * 0.25,
        borderColor: 'red'
    },
    pickerView: {
        height: config.deviceHeight * 0.06,
        width: config.deviceWidth * 0.8,
        marginTop: config.deviceHeight * 0.2,
        borderWidth: 1,
        borderColor: 'cornflowerblue',
        borderRadius: 5,
        justifyContent: 'center'
    },
    classCardText: {
        fontSize: 20,
        marginTop: config.deviceHeight * 0.01,
        color: '#041a5e'
    },
    materialOption: {
        height: config.deviceHeight * 0.3,
        width: config.deviceWidth * 0.6,
        borderRadius: 10,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'white',
        elevation: 10
    },
    materialOptionText: {
        fontSize: 20,
        marginTop: config.deviceHeight * 0.05,
        marginBottom: config.deviceHeight * 0.01,
        color: '#041a5e'
    },
    margin: {
        height: config.deviceHeight * 0.25
    },
    whiteSpace: {
        height: config.deviceHeight * 0.08
    }
});