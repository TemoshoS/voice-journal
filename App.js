
import { StyleSheet, Text, View ,SafeAreaView} from 'react-native';
import VoiceNoteList from './components/VoiceNoteList';
import VoiceRecorder from './components/VoiceRecorder';
import { useState } from 'react';
import { Audio } from 'expo-av';
import { formatDuration } from './components/utils';


export default function App() {
  const [notes, setNotes] = useState([]);

  const handlePlayNote = async (note) =>{
    try {
      const soundObject =  new Audio.Sound();
      await soundObject.loadAsync({uri: note.uri});
      await soundObject.playAsync();

      const duration = await soundObject.getStatusAsync();
      const formattedDuration = formatDuration(duration.durationMillis / 1000);
      alert(`Playing: ${formattedDuration}`);
      
    } catch (error) {
      console.error('Error playing audio', error)
      
    }

  }

  const handleDeleteNote = (note)=>{
    const updatedNotes = notes.filter((n) => n.id !== note.id);
    setNotes(updatedNotes);
  }

  const handleSaveNote =(noteURL)=> {
    const newNote = {
      id: notes.length + 1,
      title: `Voice Note ${notes.length + 1}`,
      uri: noteURL,
    };
    setNotes([...notes, newNote])
  }
  return (
    <View style={styles.container}>
     <SafeAreaView>
      <View style={styles.voiceRecord}>
      <Text style={styles.voiceRecordTx}>Voice Recorder</Text>
      </View>
      <VoiceRecorder onSaveNote={handleSaveNote}/>
      <VoiceNoteList 
      notes={notes}
      onPlayNote={handlePlayNote}
      onDeleteNote={handleDeleteNote}
      formatDuration={formatDuration}/>
     </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  voiceRecord:{
    justifyContent: 'center',
    alignItems: 'center',
    padding : 5
    
  },
  voiceRecordTx:{
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold'
  }
});
