import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import VoiceNoteList from '../components/VoiceNoteList';

const VoiceNoteListScreen = ({ navigation, route }) => {

    const { notes, onPlayNote, onDeleteNote, formatDuration } = route.params;
    console.log("Received Notes:", notes);

    return (
        <View style={styles.container}>
            <VoiceNoteList
                notes={notes}
                onPlayNote={onPlayNote}
                onDeleteNote={onDeleteNote}
                formatDuration={formatDuration}

            />
            
        </View>
    )
}

export default VoiceNoteListScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    }
})