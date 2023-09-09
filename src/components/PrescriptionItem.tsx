import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, GestureResponderEvent } from "react-native"
import { useState } from 'react'
const voiceImage = require('../assets/icons/voice.png');
type PrescriptionItem = {
  title: string,
  onPressOut?: (e: GestureResponderEvent) => void,
  onPressIn?: (e: GestureResponderEvent) => void,
  onChangeText?: (text: string) => void,
  placeholder?: string,
  iconImgSource?: any,
  text?: string,
}
const PrescriptionItem = ({ title, onPressOut, onPressIn, onChangeText, placeholder, iconImgSource, text }: PrescriptionItem) => {
  const [borderColor, setBorderColor] = useState('lightgrey');
  const [recordButtonStyle, setRecordButtonStyle] = useState({})
  return (
    <View style={{
      display: 'flex',
      flexDirection: 'row',
      margin: 4,
      marginLeft: -60,
      gap: 10,
    }}
    >
      <TouchableOpacity onPressIn={onPressIn} onPressOut={onPressOut} activeOpacity={.6} >

        <View style={[{
          display: 'flex',
          flexDirection: 'row',
          backgroundColor: '#FFFFFFA3',
          borderWidth: 1,
          borderRadius: 10,
          borderColor: "#9BC3FF",
          paddingHorizontal: 5,
          paddingVertical: 5,
          width: 100,
          justifyContent: 'space-between'
        }, recordButtonStyle]}
        >
          <View style={[{ justifyContent: 'center' }]}

          >
            <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
              <Image source={iconImgSource} style= {{height: 30, width: 30}} />
            </View>
            <Text style={[styles.font10, styles.textBlack, { padding: 2, textTransform: 'uppercase' }]}> {title} </Text>
          </View>
          <View style={{ justifyContent: 'center' }}>
            <Image source={voiceImage} style={{ width: 20, height: 20 }} />
          </View>
        </View>
      </TouchableOpacity>
      <View style={{
        flexGrow: 1,
      }}>
        <Text style={[styles.textBlack, styles.font10, styles.bold]}> {title}:</Text>
        <TextInput style={[
          styles.font10,
          styles.textBlack,
          {
            padding: 0,
            marginTop: 0,
            width: 250,
            borderWidth: .2,
            borderRadius: 2,
            borderColor: borderColor,

          }
        ]}
          placeholder={placeholder}
          multiline
          numberOfLines={4}
          onChangeText={onChangeText}
          value={text}
          onFocus={() => { setBorderColor("black") }}
          onBlur={() => { setBorderColor('lightgrey') }}
        />
      </View>
    </View>
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
  },
  touchStyle: {
    backgroundColor: '#00000023'
  },

})

export default PrescriptionItem;