import { Video } from 'expo-av'
import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import { View, Text } from 'react-native'
import styles from './styles'
import { use_user } from '../../hooks/use_user'
import Post_Overlay from './overlay'

export const Single_Post = forwardRef(({ item }, parent_ref) => {
  const ref = useRef(null);
  const user = use_user(item.creator).data
  useImperativeHandle(parent_ref, () => ({ play, unload, stop }))

  useEffect(() => { return () => unload(); }, [])

  const play = async () => {
    if (ref.current == null) { return; }
    const status = await ref.current.getStatusAsync();
    if (status?.isPlaying) { return; }
    try { await ref.current.playAsync(); }
    catch (e) { console.log(e) }
  }

  const stop = async () => {
    if (ref.current == null) { return; }
    const status = await ref.current.getStatusAsync();
    if (!status?.isPlaying) { return; }
    try { await ref.current.stopAsync(); }
    catch (e) { console.log(e) }
  }

  const unload = async () => {
    if (ref.current == null) { return; }
    try { await ref.current.unloadAsync(); }
    catch (e) { console.log(e) }
  }

  return (
    <>
      <Post_Overlay user={user} post={item}/>
      <Video style={styles.video}
        ref={ref}
        resizeMode={'cover'}
        shouldPlay={false}
        rate={1}
        isLooping
        usePoster
        posterStyle={{ resizeMode: 'cover' }}
        posterSource={{ uri: item.media[1] }}
        source={{ uri: item.media[0] }}
      />
    </>
  )
})

export default Single_Post
