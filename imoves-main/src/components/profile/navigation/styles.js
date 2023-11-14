import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 30,
  },
  status: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    width: 130,
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: 'transparent'
  },
  coins: {
    fontSize: 30,
    paddingTop: 20,
    color: '#FF9900'
  },
  favourites: {
    marginTop: 30
  },
  profile: {
    width: 130,
    height: 130
  }
})

export default styles
