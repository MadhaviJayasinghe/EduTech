import { StyleSheet } from 'react-native';
import config from '@config/config'
import colors from '@res/colors';

export default StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    marginTop: 20,
    marginBottom: 30,
    fontSize: 28,
    fontWeight: '500'
  },
  row: {
    width: config.deviceWidth*0.9,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: config.deviceHeight*0.02
  },
  content: {
    flexShrink: 1
  },
  header: {
    flexDirection: 'row'
  },
  nameText: {
    fontWeight: '600',
    fontSize: 18,
    color: colors.primary_blue
  },
  dateText: {},
  contentText: {
    color: colors.primary_gray,
    fontSize: 16,
    marginTop: 2
  },
  middleContainer: {
    position: 'absolute',
    width: config.deviceWidth,
    height: config.deviceHeight * 0.7,
    marginTop: config.deviceHeight * 0.25,
    justifyContent: 'center',
    alignItems: 'center'
  },
  createButton: {
    width: config.deviceWidth*0.2,
    height: config.deviceWidth*0.2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: colors.primary_blue,
    alignSelf: 'flex-end',
    marginRight: config.deviceWidth*0.02
  }
})