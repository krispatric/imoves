import React from 'react'
import { View, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import Add_Screen from '../../screens/add'
import Profile_Screen from '../../screens/profile'
import Feed_Screen from '../../screens/feed'

const Tab = createBottomTabNavigator()

const TEST_SCREEN = () => {
  return (<View><Text>i am a placeholder</Text></View>)
}

export default function Home_Screen() {
  return (
    <Tab.Navigator
      initialRouteName='feed'
      activeColor='#E0E0E0'
      inactiveColor='#E0E0E0'
      shifting={true}
      screenOptions=
      {{
        headerShown: false,
        tabBarInactiveBackgroundColor: '#000000',
        tabBarActiveBackgroundColor: '#000000',
        tabBarStyle: { borderTopWidth: 0 }
      }}
    >
      <Tab.Screen
        name='Feed'
        component={Feed_Screen}
        options={{ tabBarIcon: () => <MaterialCommunityIcons name='home' size={24} color={'#702F8A'} /> }}
      />
      <Tab.Screen
        name='Add'
        component={Add_Screen}
        options={{ tabBarIcon: () => <MaterialCommunityIcons name='plus-circle' circle size={24} color={'#702F8A'} /> }}
      />
      <Tab.Screen
        name='Profile'
        component={Profile_Screen}
        options={{ tabBarIcon: () => <MaterialCommunityIcons name='baby-face' size={24} color={'#702F8A'} /> }}
      />
    </Tab.Navigator>
  )
}
