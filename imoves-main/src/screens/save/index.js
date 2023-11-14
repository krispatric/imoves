import { MaterialCommunityIcons } from '@expo/vector-icons'
import { StackActions, useNavigation } from '@react-navigation/native'
import { Video } from 'expo-av'
import React, { useState } from 'react'
import { View, StatusBar ,Text} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { ActivityIndicator, TextInput } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { post } from '../../redux/actions'
import { Feather } from '@expo/vector-icons'
import styles from './styles'
import * as MediaLibrary from 'expo-media-library'

export default function Save_Screen(props) {
  const [description, set_description] = useState('')
  const [request_running, set_request_running] = useState(false)
  const NAVIGATION = useNavigation()

  const dispatch = useDispatch()
  const handle_save_post = async () => {
    set_request_running(true)
    const asset = await MediaLibrary.createAssetAsync(props.route.params.source);
    dispatch(post(description, props.route.params.source, props.route.params.thumbnail))
      .then(() => NAVIGATION.dispatch(StackActions.popToTop()))
      .catch(() => set_request_running(false))
  }
  if (request_running) {
    return (
      <View style={styles.upload}>
        <ActivityIndicator size={70} />
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <StatusBar style='light' />
      <View>
        <Video style={styles.mediaPreview}
          resizeMode='cover'
          shouldPlay={true}
          isLooping={true}
          rate={1}
          isMuted={true}
          source={{ uri: props.route.params.source }}
        />
        <TextInput style={styles.title}
          placeholder='Describe the video'
          multiline={true}
          maxLength={120}
          onChangeText={(text) => set_description(text)}
        />
      </View>
      <View style={styles.spacer} />

<View style={styles.buttonsContainer}>
  <TouchableOpacity onPress={() => NAVIGATION.goBack()}
    style={styles.cancelButton}>
    <Feather name="x" size={20} color="black"></Feather>
    <Text style={styles.cancelButtonText}>Cancel</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.PostButton}
    onPress={() => handle_save_post()}
  >
    <Feather name="corner-left-up" size={20} color="white"></Feather>
    <Text style={styles.PostButtonText}>Save</Text>
  </TouchableOpacity>
</View>
</View>
)
}