import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    alignItems: 'center',
    padding: 30,
    flex: 1
  },
  video: {
    position: 'absolute',
    top: -100,
    right: 0,
    left: 0,
    bottom: 0,
    zIndex: 0
  }
});

export default styles;
