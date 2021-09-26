import { StyleSheet } from'react-native';
import config from '@config/config'
    
export default StyleSheet.create({
    container: {
        flex:1,
        height: config.deviceHeight, 
        width: config.deviceWidth,
        justifyContent: 'center',
        alignItems: 'center'
    }
});