import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'

export default function VoiceNoteList({notes, onPlayNote, onDeleteNote}) {
  return (
    <View>
      <FlatList

      data={notes}
      keyExtractor={(item)=>item.id.toString()}
      renderItem={({item})=>(
        <View>
           <Text>{item.title}</Text>
           <TouchableOpacity onPress={()=> onPlayNote(item)}>
            <Text>Play</Text>
           </TouchableOpacity>
           <TouchableOpacity onPress={() => onDeleteNote(item)}>
            <Text>Delete</Text>
           </TouchableOpacity>
        </View>
      )}
      />
    </View>
  )
}

const styles = StyleSheet.create({})