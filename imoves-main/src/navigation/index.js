import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { useDispatch, useSelector } from 'react-redux'
import { signed_in } from '../redux/actions'
import Auth_Screen from '../screens/auth'
import Home_Screen from '../navigation/home'
import Save_Screen from '../screens/save'

const stack = createStackNavigator()

export default function Route() {
  const user = useSelector(state => state.auth)
  console.log(user)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(signed_in());
  }, [])

  if (!user.loaded) {
    return (
      <View>
      </View>
    )
  }

  return (
    <NavigationContainer>
      <stack.Navigator>
        {
          user.currentUser == null ?
            <stack.Screen name='auth' component={Auth_Screen} options={{ headerShown: false }} />
            :
            <>
              <stack.Screen name='home' component={Home_Screen} options={{ headerShown: false }} />
              <stack.Screen name='save' component={Save_Screen} options={{ headerShown: false }} />
            </>
        }
      </stack.Navigator>
    </NavigationContainer>
  )
}
