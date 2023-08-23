import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React,{useState, useEffect} from 'react'
import {Audio} from 'expo-av'
import { MaterialIcons } from '@expo/vector-icons';
import { formatDuration } from './utils';



export default function VoiceRecorder({onSaveNote}) {
    const [recording, setRecording] = useState();
    const [isRecording, setIsRecording] = useState(false);
    const [recordingStartTime, setRecordingStartTime] = useState(null);
    const [recordingDuration, setRecordingDuration] = useState(0);

    useEffect(()=>{
        let timer;
        if (isRecording) {
            setRecordingStartTime(Date.now());
            timer = setInterval(() => {
                const duration = Math.floor((Date.now() - recordingStartTime) / 1000);
                setRecordingDuration(duration);
            }, 1000);
        } else {

            clearInterval(timer);
            setRecordingDuration(0);
            
        }

        return ()=> clearInterval(timer);

    },[isRecording, recordingStartTime]);



    const startRecording = async ()=>{
        try {
            const {recording} = await Audio.Recording.createAsync(
                Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
            );

            setRecording(recording);
            setIsRecording(true);
            
        } catch (error) {
            console.error('Failed to start recording', error)
            
        }
    };

    const stopRecording = async () => {
        if (!recording) return;
    
        await recording.stopAndUnloadAsync();
        setIsRecording(false);
    
        onSaveNote(recording.getURI());
      
      };

     
  return (
    <View style={styles.container}>
          <View style={styles.iconContainer}>
              <View
                   style={[
                    styles.circle,
                    {backgroundColor: isRecording ? '#ff004f' : 'transparent'},
                    {borderColor: isRecording ? '#555555' : 'transparent',
                    shadowColor: 'red',
                    shadowOpacity: 5,
                    shadowRadius: 20,
                
                    },
                    
                    
                   ]}
              
              >
                  <MaterialIcons name="keyboard-voice" size={74} color="white" />
              </View>
              {isRecording && <Text style={styles.durationTxt}>{` ${formatDuration(recordingDuration)}`}</Text>}
          </View>

        <View>
      <TouchableOpacity 
      onPress={isRecording ? stopRecording : startRecording}
      style={styles.button}>

        <Text style={styles.recordTxt}>{isRecording ? 'Stop recording' : 'Start recording'}</Text>
      </TouchableOpacity>
      
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'center',
        alignItems: 'center'
    },
    iconContainer:{
        justifyContent:'center',
        alignItems: 'center',
        padding :50
    },
    circle:{
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        borderWidth: 1,
        
        
        
    },
    durationTxt:{
        color: 'white',
        marginTop: 10

    },
    button:{
        marginTop: 10,
        backgroundColor: '#ff004f',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        
    },
    recordTxt:{
        color: 'white',
        fontWeight: 'bold'
    }

})