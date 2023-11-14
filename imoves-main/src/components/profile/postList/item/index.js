import React, { useState, useRef } from "react";
import { View, Text, Image, TouchableOpacity, Modal, StyleSheet, useWindowDimensions } from 'react-native';
import { Video } from "expo-av";

export default function ProfilePostListItem({ item }) {

  const [modalVisible, setModalVisible] = useState(false);
  const videoRef = useRef(null);
  const width = useWindowDimensions().width; // get the width of the screen

  const handleThumbnailPress = () => {
    setModalVisible(true);
  }

  const handleModalClose = () => {
    setModalVisible(false);
  }

  const handleModalShow = () => {
    if (videoRef.current) {
      videoRef.current.playAsync();
    }
  }

  return (
    <TouchableOpacity onPress={handleThumbnailPress}>
      <View style={styles.container}>
        <Image style={{width: width / 3, height: width /3}} source={{ uri: item.media[1] }} />
      </View>
      <Modal
        visible={modalVisible}
        animationType='slide'
        onRequestClose={handleModalClose}
        onShow={handleModalShow}
      >
        <View style={modalStyles.container}>
          <Video
            ref={videoRef}
            source={{ uri: item.media[0] }}
            style={modalStyles.video}
            resizeMode='contain'
            isLooping={true}
            shouldPlay
          />
          <TouchableOpacity onPress={handleModalClose}>
            <Text style={modalStyles.closeButton}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const modalStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,1)',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    marginTop: -50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: 'white',
    color: 'black'
  }
});
