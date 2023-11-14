import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    alignItems: 'center',
    padding: 30,
    flex: 1
  },
  camera: {
    position: 'absolute',
    top: -100,
    right: 0,
    left: 0,
    bottom: 0,
    zIndex: 0,
    aspectRatio: 9 / 16
  },
  side_overlay: {
    top: 60,
    right: 0,
    marginHorizontal: 20,
    position: 'absolute'
  },
  side_button: {
    alignItems: 'center',
    marginBottom: 22
  },
  bottom_overlay: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center'
  },
  button_box: {
    flex: 1,
    marginHorizontal: 30
  },
  record_button: {
    borderWidth: 8,
    borderColor: '#FF000060',
    backgroundColor: '#FF0000',
    borderRadius: 100,
    height: 80,
    width: 80,
    alignSelf: 'center',
    marginBottom: 20
  },
  gallery_button: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 10,
    overflow: 'hidden',
    width: 50,
    height: 50
  },
  recent_video: {
    width: 50,
    height: 50
  }
});

export default styles;
