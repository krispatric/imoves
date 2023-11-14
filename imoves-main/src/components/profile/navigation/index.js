import { MaterialCommunityIcons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { View, Text, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Avatar, Button, TextInput } from 'react-native-paper'
import styles from './styles'
import * as ImagePicker from 'expo-image-picker'
import save_user_profile_image from '../../../services/user'
import { useSelector } from 'react-redux'

export default function ProfileNavBar({ USER }) {
  const auth = useSelector(state => state.auth)
  const NAME = String(USER.displayName)
  const PICK_AVATAR = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    })
    if (!result.canceled) { save_user_profile_image(result.uri) }
  }

  return (
    <View style={styles.container}>
      <StatusBar style='light' />
      <View style={{ paddingTop: 30 }}>
        <TouchableOpacity
          onPress={() => PICK_AVATAR()}
        >
          <Avatar.Icon size={140} icon={'baby-face'} />
        </TouchableOpacity>
      </View>
      <View style={styles.status}>
        <TextInput style={styles.title}
          placeholder={NAME}
          mode='flat'
          theme={{ colors: { onSurfaceVariant: '#E0E0E0', onSurface: '#E0E0E0', primary: '#702F8A' } }}
        />
        <TouchableOpacity>
          <Text style={styles.coins}>
            <MaterialCommunityIcons name='alpha-i-circle' style={styles.coins} />{' '}
            1350
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Button mode='contained' style={styles.favourites} buttonColor='#FF5555'>
            <MaterialCommunityIcons name='heart' />{' '}favourites
          </Button>
        </TouchableOpacity>
      </View>
    </View>
  )
}
