import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { formatDuration } from './utils';

export default function VoiceNoteList({notes, onPlayNote, onDeleteNote, formatDuration}) {
  return (
    <View style={styles.container}>
    <FlatList
      data={notes}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.recordingsContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.buttonsContainer}>
              <TouchableOpacity onPress={() => onPlayNote(item)}>
                <Feather name="play-circle" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onDeleteNote(item)}>
                <AntDesign name="delete" size={24} color="black" />
              </TouchableOpacity>
              <Text style={styles.durationText}>{formatDuration(item.duration)}</Text>
            </View>
          </View>
      )}
    />
  </View>
  )
}

const styles = StyleSheet.create({
    container:{
      backgroundColor: 'whitesmoke',
      marginTop: 15,
      borderRadius: 10
    },
    recordingsContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: 'black',

    },
    title: {
        flex: 1, 
        marginRight: 10, 
      },
      buttonsContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
      },
})