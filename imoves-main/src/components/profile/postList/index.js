import React from "react";
import {View,Text} from 'react-native';
import { FlatList } from "react-native-gesture-handler";
import ProfilePostListItem from "./item";
import styles from "./styles";


export default function ProfilePostList({posts}){
    return (
        <View style={styles.container}>
            <FlatList 
                numColumns={3}
                removeClippedSubviews
                data={posts}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (<ProfilePostListItem item={item}/>)}

            
            />
        </View>
    )
}