
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { SafeAreaView, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { Dimensions } from 'react-native'
import Single_Post from '../../components/post'
import styles from './styles'
import { get_feed } from '../../services/posts'
import { StatusBar } from 'expo-status-bar';

export default function FeedScreen({ route }) {
  const [posts, setPosts] = useState([])
  const media_refs = useRef([])

  useEffect(() => {
    get_feed().then(setPosts)
  }, [])

  const on_viewable_items_changed = useRef(({ changed }) => {
    changed.forEach(element => {
      const cell = media_refs.current[element.key]
      if (cell) {
        if (element.isViewable) { cell.play(); } else { cell.stop(); }
      }
    });
  })

  const render_item = ({ item, index }) => {
    //const [isPlaying, setIsPlaying] = useState(true);
    //const togglePlaying = () =>setIsPlaying(!isPlaying);
    return (
      <SafeAreaView style={[{ flex: 1, height: Dimensions.get('window').height - 14.7 }, index % 2 ? { backgroundColor: 'black' } : { backgroundColor: 'white' }]}>
        <Single_Post item={item} ref={Single_Post_Ref => (media_refs.current[item.id] = Single_Post_Ref)} 
        //onPress={togglePlaying} paused={!isPlaying} 
        />
      </SafeAreaView>
    )
  }

  const NAVBAR_HEIGHT = useBottomTabBarHeight()
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='light' />
      <FlatList
        data={posts}
        renderItem={render_item}
        pagingEnabled={true}
        keyExtractor={item => item.id}
        viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
        onViewableItemsChanged={on_viewable_items_changed.current}
      />
    </SafeAreaView>
  )
}


