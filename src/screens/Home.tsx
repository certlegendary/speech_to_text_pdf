import { View, Text, ImageBackground, StyleSheet, Image, TextInput, ScrollView, Button, } from 'react-native';
import { useState } from 'react';
import PrescriptionItem from '../components/PrescriptionItem';

const voiceImage = require('../assets/icons/voice.png');
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
const HomeScreen = () => {
const [formData, setFormData] = useState<TypeFormData>({})
const onChangeText = (key: keyof typeof initialData) => (text: string) => {
  setFormData((state) => {
    return {
      ...state,
      [key]: text,
    }
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
            <Text style={styles.font12}>
              Name:
            </Text>
            <View style={{
              display: 'flex',
              flexDirection: "row"
            }}>
              <Text style={styles.font12}>
                Ange:
              </Text>
              <Text style={[styles.font12, { width: 40 }]}>

              </Text>
              <Text style={styles.font12}>
                Gender:
              </Text>
              <Text style={styles.font12}>

              </Text>
            </View>
          </View>
          <View>
            <Image source={require('../assets/icons/voice.png')} />
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
                  Rashia Singh, Female, 31
                </Text>
                <Text style={[styles.textBlack, styles.font12]}>
                  Date: 28/10/23
                </Text>
              </View>
              <PrescriptionItem title='Vitals' iconImgSource={VitalIcon} text={formData.vitals} onChangeText={onChangeText('vitals')}></PrescriptionItem>
              <PrescriptionItem title='Complaint' iconImgSource={complaintIcon} text={formData.complaint} onChangeText={onChangeText('complaint')} ></PrescriptionItem>
              <PrescriptionItem title='Diagnosis' iconImgSource={DiagnosisIcon} text={formData.diagnosis} onChangeText={onChangeText('diagnosis')} ></PrescriptionItem>
              <PrescriptionItem title='Medications' iconImgSource={MedicationIcon} text={formData.medication} onChangeText={onChangeText('medication')} ></PrescriptionItem>
              <PrescriptionItem title='Advice' iconImgSource={AdviceIcon} text={formData.advice} onChangeText={onChangeText('advice')} ></PrescriptionItem>
              <PrescriptionItem title='Follow Up' iconImgSource={FollowupIcon} text={formData.followup} onChangeText={onChangeText('followup')} ></PrescriptionItem>

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
          justifyContent: 'center'
        }}>
          <Button title='Create Prescription' />

        </View>

      </ImageBackground>
    </ScrollView>
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