import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Modal } from 'react-native'
import { State } from 'react-native-gesture-handler'
import styles from './styles'

export default function post_overlay({ user, post }) {
  const [currentLikeState, setCurrentLikeState] = useState({ state: false, counter: 0 })
  const [categoryModalVisible, setCategoryModalVisible] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('Category 1')

  const CATEGORY_OPTIONS = [
    { label: 'Category 1', value: 'category1' },
    { label: 'Category 2', value: 'category2' },
    { label: 'Category 3', value: 'category3' },
    { label: 'Category 4', value: 'category4' },
  ];

  

  const handleUpdateLike = () => {
    setCurrentLikeState({
      state: !currentLikeState.state,
      counter: currentLikeState.counter + (currentLikeState.state ? -1 : 1)
    })
  }

  const handleCategoryPress = () => {
    setCategoryModalVisible(true)
  }

  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
    setCategoryModalVisible(false)
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.name}>{user?.displayName}</Text>
        <Text style={styles.description}>{post.description}</Text>
      </View>
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={handleCategoryPress}>
          <Ionicons style={styles.categoryIcon} color={'black'} size={30} name={'ios-albums'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleUpdateLike}>
          <Ionicons color={'white'} size={40} name={currentLikeState.state ? 'heart' : 'heart-outline'} />
          <Text style={styles.actionButtonText}>375{currentLikeState.counter}</Text>
        </TouchableOpacity>
      </View>
      <Modal animationType={'fade'} transparent={true} visible={categoryModalVisible}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={() => handleCategorySelect('Category 1')}>
              <Text style={styles.modalOption}>Category 1</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleCategorySelect('Category 2')}>
              <Text style={styles.modalOption}>Category 2</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleCategorySelect('Category 3')}>
              <Text style={styles.modalOption}>Category 3</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleCategorySelect('Category 4')}>
              <Text style={styles.modalOption}>Category 4</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}