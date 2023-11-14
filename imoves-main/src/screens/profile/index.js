import React from 'react'
import { View, Text } from 'react-native'
import { useSelector } from 'react-redux'
import ProfileNavBar from '../../components/profile/navigation'
import ProfilePostList from '../../components/profile/postList'
import styles from './styles'

export default function Profile_Screen() {
  const USER = useSelector(STATE => STATE.auth.currentUser)
  const currentUserPosts = useSelector(STATE => STATE.posts.currentUserPosts)
  return (
    <View style={styles.container}>
      <ProfileNavBar USER={USER} />
      <ProfilePostList posts={currentUserPosts} />
    </View>
  )
}
