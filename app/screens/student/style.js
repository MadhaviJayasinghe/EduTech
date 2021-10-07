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
    smallButton: {
        flex: 1 / 3,
        height: config.deviceHeight * 0.18,
        backgroundColor: '#A4C400',
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
        color: '#041a5e'
    },
    cardTextLarge: {
        fontSize: 25,
        marginBottom: config.deviceHeight * 0.02,
        color: '#041a5e'
    },
    pickerView: {
        height: config.deviceHeight * 0.06,
        width: config.deviceWidth * 0.8,
        marginTop: config.deviceHeight * 0.02,
        borderWidth: 1,
        borderColor: 'cornflowerblue',
        borderRadius: 5,
        justifyContent: 'center'
    },
    flatlist: {
        marginTop: config.deviceHeight*0.02,
        borderColor:'red'
    },
    classCard: {
        padding: 10, 
        width:config.deviceWidth*0.45,
        height: config.deviceHeight*0.24,
        margin:5,
        borderRadius: 5,
        marginBottom: config.deviceWidth*0.03,
        elevation:2,
        justifyContent: 'center',
        alignItems:'center'
    },
    cardTextMedium: {
        fontSize: 18,
        color: '#041a5e',
        marginTop: -config.deviceHeight*0.02
    },
    cardLecture: {
        padding: 10, 
        borderColor: '#041a5e', 
        borderWidth: 1.5, 
        width:config.deviceWidth*0.9,
        borderRadius: 5,
        marginBottom: config.deviceWidth*0.03
    },
});