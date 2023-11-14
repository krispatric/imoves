import React, { useState } from 'react'; // core framework
import { View, Text, ToastAndroid } from 'react-native'; // view for displaying things text for displaying text
import { TextInput, Button } from 'react-native-paper'; // input field and button components that look nice
import { useWindowDimensions } from 'react-native' // to get the width of the screen
import styles from './styles'; // styles in separate file
import { useDispatch } from 'react-redux'; // allows us to dispatch data to redux actions
import { sign_in } from '../../../redux/actions'; // sign in action
import { sign_up } from '../../../redux/actions'; // sign up action


export default function AuthMenu({ prompt_password, set_prompt_password }) { // we are passing boolean prompt_password and method set_prompt_password to set it
  const width = useWindowDimensions().width; // get the width of the screen
  const [email, set_email] = useState('')
  const [password, set_password] = useState('')

  const toast = (message) => { ToastAndroid.show(message, ToastAndroid.SHORT) }

  const dispatch = useDispatch()
  const handle_sign_in = () => {
    dispatch(sign_in(email, password))
      .then(() => {
        console.log('SIGN IN: SUCCESS')
      })
      .catch(() => {
        console.log('SIGN IN: ERROR')
      })
  }
  const handle_sign_up = () => {
    dispatch(sign_up(email, password))
      .then(() => {
        console.log('SIGN UP: SUCCESS')
      })
      .catch(() => {
        console.log('SIGN UP: ERROR')
      })
  }
  return (
    <View style={styles.container} >
      <Text style={styles.header_text}>Welcome</Text>
      <TextInput
        label='Email'
        mode='flat'
        style={{ backgroundColor: 'transparent', width: width * .7 }}
        theme={{ colors: { onSurfaceVariant: '#E0E0E0', onSurface: '#E0E0E0', primary: '#702F8A' } }}
        onChangeText={(text) => set_email(text) & console.log(text)}
      />
      {
        !prompt_password ?
          <Button style={styles.button}
            mode='contained'
            onPress={() => {
              if (prompt_password) { set_prompt_password(false) & console.log(prompt_password) }
              if (!prompt_password) { set_prompt_password(true) & console.log(prompt_password) }
            }}
            theme={{ colors: { outline: '#702F8A', primary: '#702F8A', secondary: '#E0E0E0' } }}
          >
            Continue
          </Button>
          :
          <TextInput
            label='Password'
            mode='flat'
            style={{ backgroundColor: 'transparent', width: width * .7 }}
            theme={{ colors: { onSurfaceVariant: '#E0E0E0', onSurface: '#E0E0E0', primary: '#702F8A' } }}
            onChangeText={(text) => set_password(text) & console.log(text)}
            secureTextEntry
            onEndEditing={() => handle_sign_in() & toast('signing in..')}
          />
      }
      <Button style={styles.button}
        mode='outlined'
        onPress={() => handle_sign_up() & toast('signing up..')}
        theme={{ colors: { outline: '#702F8A', primary: '#E0E0E0', secondary: '#E0E0E0' } }}
      >
        Sign-Up
      </Button>
    </View >
  )
}
