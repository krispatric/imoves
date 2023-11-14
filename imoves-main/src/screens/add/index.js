import React, { useEffect, useState } from 'react'
import { View, Text, Image, useWindowDimensions, TouchableOpacity } from 'react-native'
import { Camera } from 'expo-camera'
import { Audio } from 'expo-av'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import * as VideoThumbnails from 'expo-video-thumbnails'
import * as ImagePicker from 'expo-image-picker'
import * as MediaLibrary from 'expo-media-library'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import styles from './styles'

export default function Add_Screen() {
  const focus = useIsFocused()
  const [ recording, set_recording ] = useState(false)

  const [camera_permissions, set_camera_permissions] = useState(false)
  const [audio_permissions, set_audio_permissions] = useState(false)
  const [gallery_permissions, set_gallery_permissions] = useState(false)

  const [videos, add_video] = useState([])
  const [camera_ref, set_camera_ref] = useState(null)
  const [camera_type, set_camera_type] = useState(Camera.Constants.Type.back)
  const [camera_flash, set_camera_flash] = useState(Camera.Constants.FlashMode.off)
  const [camera_ready, set_camera_ready] = useState(false)

  const NAVIGATION = useNavigation()

  useEffect(() => {
    (async () => {
      const camera = await Camera.requestCameraPermissionsAsync()
      set_camera_permissions(camera.status == 'granted')
      const audio = await Camera.requestMicrophonePermissionsAsync()
      set_audio_permissions(audio.status == 'granted')
      const gallery = await ImagePicker.requestMediaLibraryPermissionsAsync()
      set_gallery_permissions(gallery.status == 'granted')

      if (gallery.status == 'granted') {
        const media = await MediaLibrary.getAssetsAsync({ sortBy: ['creationTime'], mediaType: ['video'] })
        add_video(media.assets)
      }
    })()
  }, [])

  const record_video = async () => {
    if (camera_ref && !recording) {
      set_recording(true)
      try {
        const options = { maxDuration: 60, quality: Camera.Constants.VideoQuality['480'] }
        const video_record_promise = camera_ref.recordAsync(options)
        if (video_record_promise) {
          const data = await video_record_promise;
          const source = data.uri;
          let thumbnail = await generate_thumbnail(source)
          NAVIGATION.navigate('save', { source, thumbnail })
        }
      }
      catch (error) {
        console.warn(error)
      }
    }
    else if (recording) { set_recording(false); camera_ref.stopRecording(); }
  }

  const stop_video = async () => {
    if (camera_ref) {
      camera_ref.stopRecording()
    }
  }

  const open_picker = async () => {
    let video = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1
    })
    if (!video.canceled) {
      let thumbnail = await generate_thumbnail(video.uri)
      NAVIGATION.navigate('save', { source: video.uri, thumbnail })
    }
  }

  const generate_thumbnail = async (source) => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(
        source,
        {
          time: 1000
        }
      );
      return uri;
    }
    catch (e) { }
  }

  if (!camera_permissions || !audio_permissions || !gallery_permissions) { return (<View></View>) }
  return (
    <View style={styles.container}>
      {
        focus ?
          <Camera
            ref={ref => set_camera_ref(ref)}
            style={styles.camera}
            ratio={'16:9'}
            type={camera_type}
            flashMode={camera_flash}
            onCameraReady={() => set_camera_ready(true)}
          />
          :
          null
      }
      <View style={styles.side_overlay}>
        <TouchableOpacity style={styles.side_button}
          onPress={() => set_camera_type(camera_type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back)}
        >
          {
            camera_type === Camera.Constants.Type.back ?
              <MaterialCommunityIcons name='account' size={24} color='#FFFFFF' />
              :
              <MaterialCommunityIcons name='image' size={24} color='#FFFFFF' />
          }
          <Text style={{ color: '#FFFFFF', marginTop: 5 }}>flip</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.side_button}
          onPress={() => set_camera_flash(camera_flash === Camera.Constants.FlashMode.off ? Camera.Constants.FlashMode.torch : Camera.Constants.FlashMode.off)}
        >
          {
            camera_flash === Camera.Constants.FlashMode.off ?
              <MaterialCommunityIcons name='flash' size={24} color='#FFFFFF' />
              :
              <MaterialCommunityIcons name='flash' size={24} color='#FFF000' />
          }
          <Text style={{ color: '#FFFFFF', marginTop: 5 }}>flash</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottom_overlay}>
        <View style={{ flex: 1 }}>
        </View>
        <View style={styles.button_box}>
          <TouchableOpacity style={styles.record_button}
            disabled={!camera_ready}
            onPress={() => record_video()}
          />
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity style={styles.gallery_button}
            onPress={() => open_picker()}
          >
            {
              videos[0] == undefined ?
                <></>
                :
                <Image style={styles.recent_video}
                  source={{ uri: videos[0].uri }}
                />
            }
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
