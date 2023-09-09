import { View, Text, ImageBackground, StyleSheet, Image, TextInput, ScrollView, Button, GestureResponderEvent, Alert, TouchableOpacity } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import PrescriptionItem from '../components/PrescriptionItem';
import { generatePDF, uploadAudio } from '../actions/HomeAction'
import { request, PERMISSIONS, requestMultiple } from 'react-native-permissions'
import AudioRecorderPlayer, { AudioEncoderAndroidType, AudioSourceAndroidType, AVEncoderAudioQualityIOSType, AVEncodingOption } from 'react-native-audio-recorder-player';

const audiorecorderPlayer = new AudioRecorderPlayer();

const backgroundImg = require('../assets/images/bg-blue.png');
const VitalIcon = require('../assets/icons/heart-rate.png');
const complaintIcon = require('../assets/icons/report.png');
const DiagnosisIcon = require('../assets/icons/heartbeat.png');
const MedicationIcon = require('../assets/icons/medicine.png');
const AdviceIcon = require('../assets/icons/idea.png');
const FollowupIcon = require('../assets/icons/appointment.png');
const signatureImage = require('../assets/icons/Rectangle.png');

type TypeFormData = {
  vitals: string,
  complaint: string,
  diagnosis: string,
  medication: string,
  advice: string,
  followup: string,
}

const initialData = {
  vitals: '',
  complaint: '',
  diagnosis: '',
  medication: '',
  advice: '',
  followup: '',
}

type PaitentData = {
  name: string,
  gender: string,
  tel: string,
  address: string,
  age?: string,
}

const initialPatientData = {
  name: 'David',
  gender: 'Male',
  tel: '808-325-2852',
  address: 'London, UK',
}

const hostpital = "GojoRx";

const HomeScreen = () => {
  const date = new Date();
  const [formData, setFormData] = useState<TypeFormData>(initialData)
  const [patientData, setPatientData] = useState<PaitentData>(initialPatientData)
  const onChangeText = (key: keyof TypeFormData) => (text: string) => {
    setFormData((state) => {
      return {
        ...state,
        [key]: text,
      }
    })
  }
  const [granted, setGranted] = useState<Boolean>(false);
  const onPressOut = (key: keyof TypeFormData) => async (e: GestureResponderEvent) => {
    if (!granted) {
      return;
    }
    let url
    try {
      url = await audiorecorderPlayer.stopRecorder();
      audiorecorderPlayer.removeRecordBackListener();

    } catch (error) {
      console.log(error)
      console.log('recorder error')
    }
    if (url) {
      const result = await uploadAudio(url)
      setFormData({
        ...formData,
        [key]: result,
      })
    }
  }

  const onPressIn = (key: keyof TypeFormData) => async (e: GestureResponderEvent) => {
    if (!granted) {
      return;
    }
    const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };
    await audiorecorderPlayer.startRecorder(undefined, audioSet);
  }

  const startRecordingName = async (e: GestureResponderEvent) => {
    const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };
    await audiorecorderPlayer.startRecorder(undefined, audioSet);
  }

  const stopRecordingName = async (e: GestureResponderEvent) => {
    if (!granted) {
      return;
    }
    let url
    try {
      url = await audiorecorderPlayer.stopRecorder();
      audiorecorderPlayer.removeRecordBackListener();

    } catch (error) {
      console.log('recorder error')
    }
    if (url) {
      const result = await uploadAudio(url)
      setPatientData({
        ...patientData,
        name: result,
      })
    }
  }

  const permissionInit = useCallback(async () => {

    await requestMultiple([
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.RECORD_AUDIO,
    ])
    setGranted(true)
  }, [])
  useEffect(() => {
    permissionInit();
  }, [permissionInit]);

  const onSubmit = () => {
    generatePDF({
      ...patientData,
      hospital: hostpital,
      vitals: formData.vitals,
      complaint: formData.complaint,
      diagnosis: formData.diagnosis,
      medications: formData.medication,
      date: date.toDateString(),
      followUp: formData.followup,
      advice: formData.advice,
    })
  }

  const changePatient = (key: keyof PaitentData) => (text: string) => {
    setPatientData({
      ...patientData,
      [key]: text
    })
  }



  return (
    <ScrollView>

      <ImageBackground source={backgroundImg} resizeMode='cover'>
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: "white",
          marginTop: 60,
          marginLeft: 20,
          marginRight: 10,
          borderBlockColor: '#9BC3FF',
          borderRadius: 10,
          padding: 10,
          borderWidth: 0.5
        }}>
          <View >
            <Text style={{ color: "#245F9C", fontWeight: '700', fontSize: 14 }} >
              PATIENT DETAILS
            </Text>
            <View style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 3
            }}>
              <Text style={styles.font12}>
                Name:
              </Text>
              <TextInput style={[styles.font12, { padding: 0, margin: 0 }]} value={patientData.name} onChangeText={changePatient('name')} />
            </View>
            <View style={{
              display: 'flex',
              flexDirection: "row",
              alignItems: 'center',
              gap: 5
            }}>
              <Text style={styles.font12}>
                Age:
              </Text>
              <TextInput style={[styles.font12, { padding: 0, margin: 0 }]} value={patientData.age} onChangeText={changePatient('age')} />
              <Text style={styles.font12}>
                Gender:
              </Text>
              <TextInput style={[styles.font12, { padding: 0, margin: 0 }]} value={patientData.gender} onChangeText={changePatient('gender')} />
            </View>
          </View>

          <View>
            <TouchableOpacity
              onPressOut={stopRecordingName}
              onPressIn={startRecordingName}
              activeOpacity={.6}
            >
              <Image source={require('../assets/icons/voice.png')} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{
          display: 'flex',
          flexDirection: "row-reverse"
        }}>
          <View style={{
            width: '80%',
            marginRight: 10,
            marginVertical: 10,
            borderWidth: 0.2,
            borderColor: 'rgba(137, 138, 141, 0.20)'
          }}>
            <View style={{
              backgroundColor: '#506E9B',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 15,
            }}>
              <Image source={require('../assets/icons/plus.png')} />
              <View >
                <Text style={[styles.font14, styles.textWhite]}>
                  Dr. Priyadarshini Barua
                </Text>
                <Text style={[styles.font12, styles.textWhite]}>
                  MS, MBBS, Cardiologist
                </Text>
                <Text style={[styles.font12, styles.textWhite]}>
                  10:00am - 2:00pm
                </Text>
              </View>

            </View>
            <View style={{ backgroundColor: 'white' }}>

              <View style={{
                display: 'flex',
                flexDirection: 'row',
                borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                borderBottomWidth: 1,
                padding: 10,
                margin: 5,
                justifyContent: 'space-between'
              }}>
                <Text style={[styles.textBlack, styles.font12]}>
                  {patientData.name}, {patientData.gender}, {patientData.age}
                </Text>
                <Text style={[styles.textBlack, styles.font12]}>
                  Date: 28/10/23
                </Text>
              </View>
              <PrescriptionItem
                title='Vitals'
                iconImgSource={VitalIcon}
                text={formData.vitals}
                onChangeText={onChangeText('vitals')}
                onPressIn={onPressIn('vitals')}
                onPressOut={onPressOut('vitals')}
              />
              <PrescriptionItem
                title='Complaint'
                iconImgSource={complaintIcon}
                text={formData.complaint}
                onChangeText={onChangeText('complaint')}
                onPressIn={onPressIn('complaint')}
                onPressOut={onPressOut('complaint')}
              />
              <PrescriptionItem
                title='Diagnosis'
                iconImgSource={DiagnosisIcon}
                text={formData.diagnosis}
                onChangeText={onChangeText('diagnosis')}
                onPressIn={onPressIn('diagnosis')}
                onPressOut={onPressOut('diagnosis')}
              />

              <PrescriptionItem
                title='Medications'
                iconImgSource={MedicationIcon}
                text={formData.medication}
                onChangeText={onChangeText('medication')}
                onPressIn={onPressIn('medication')}
                onPressOut={onPressOut('medication')}
              />
              <PrescriptionItem
                title='Advice'
                iconImgSource={AdviceIcon}
                text={formData.advice}
                onChangeText={onChangeText('advice')}
                onPressIn={onPressIn('advice')}
                onPressOut={onPressOut('advice')}
              />
              <PrescriptionItem
                title='Follow Up'
                iconImgSource={FollowupIcon}
                text={formData.followup}
                onChangeText={onChangeText('followup')}
                onPressIn={onPressIn('followup')}
                onPressOut={onPressOut('followup')}
              />

              <View style={{
                display: 'flex',
                flexDirection: 'row-reverse',
                marginBottom: 3
              }}>
                <View>
                  <Image source={signatureImage} />
                </View>
              </View>
            </View>

          </View>
        </View>
        <View style={{
          padding: 20,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',

        }}>
          <Button title='Create Prescription' onPress={onSubmit} />

        </View>

      </ImageBackground>
    </ScrollView >
  )
}

const styles = StyleSheet.create({
  flex: {
    display: 'flex'
  },

  spaceBetween: {
    justifyContent: 'space-between'
  },
  font12: {
    fontSize: 12
  },
  font14: {
    fontSize: 14
  },
  textWhite: {
    color: "white"
  },
  textBlack: {
    color: 'black'
  },
  font10: {
    fontSize: 10
  },
  bold: {
    fontWeight: '700'
  }
})

export default HomeScreen;