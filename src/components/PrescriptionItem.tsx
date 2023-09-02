import { View, Text, Image, TextInput, StyleSheet } from "react-native"
import { useState } from 'react'
import { useSafeAreaFrame } from "react-native-safe-area-context";
const voiceImage = require('../assets/icons/voice.png');
type PrescriptionItem = {
    title: string,
    onTouchStart?: () => void,
    onTouchEnd?: () => void,
    onChangeText?: (text: string) => void,
    placeholder?: string,
    iconImgSource?: any,
    text?: string,
}
const PrescriptionItem = ({ title, onTouchEnd, onTouchStart, onChangeText, placeholder, iconImgSource, text }: PrescriptionItem) => {
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
            <View style={[{
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: '#FFFFFFA3',
                borderWidth: 1,
                borderRadius: 10,
                borderColor: "#9BC3FF",
                paddingHorizontal: 5,
                width: 110,
                justifyContent: 'space-between'
            }, recordButtonStyle]}
            onTouchEnd={() => {setRecordButtonStyle({backgroundColor:'#FFFFFFA3' }); onTouchEnd && onTouchEnd() }}
            onTouchStart={() => { setRecordButtonStyle(styles.touchStyle);onTouchStart && onTouchStart() }}
            >
                <View style={[{ justifyContent: 'center' }]}
                   
                >
                    <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                        <Image source={iconImgSource} />
                    </View>
                    <Text style={[styles.font10, styles.textBlack, { padding: 2, textTransform: 'uppercase' }]}> {title} </Text>
                </View>
                <View style={{ justifyContent: 'center' }}>
                    <Image source={voiceImage} style={{ width: 20, height: 20 }} />
                </View>
            </View>
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