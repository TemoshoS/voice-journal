import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import VoiceRecorder from '../components/VoiceRecorder';

const VoiceRecorderScreen = ({ navigation, route }) => {
    const { onSaveNote } = route.params;

    return (
        <View style={styles.container}>
            <VoiceRecorder onSaveNote={onSaveNote} />

        </View>
    )
}

export default VoiceRecorderScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    }
})