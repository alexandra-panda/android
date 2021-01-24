import React, { FC, Fragment, ReactElement } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ViewStyle,
  GestureResponderEvent,
  ImageSourcePropType,
} from 'react-native'
// import doctorPhoto from '@/assets/p1.png'
import startImg from '@/assets/star.png'

type DoctorCardAPropType = {
  doctorImage: ImageSourcePropType
  doctorName: string
  doctorType: string
  doctorNote: string
  style?: ViewStyle
  rightMargin?: number
  onClick: (e: GestureResponderEvent) => void
}

const Stars: FC<{ n: number }> = ({ n }): ReactElement => {
  const arr = [...Array(n).keys()]
  return (
    <Fragment>
      {arr.map((item) => (
        <Image key={item} style={{ width: 20, height: 20, marginRight: 5 }} source={startImg} />
      ))}
    </Fragment>
  )
}

export const DoctorCardA = (props: DoctorCardAPropType): ReactElement => {
  const dStyle = props.style || {}
  const grade = Math.round(Number(props.doctorNote))

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={props.onClick}>
      <View style={{ ...cardStyle.container, ...dStyle }}>
        <Image style={cardStyle.img} source={props.doctorImage} />
        <View style={cardStyle.content}>
          <View style={cardStyle.line1}>
            <Text style={cardStyle.medicName}>{props.doctorName}</Text>
          </View>
          <View style={cardStyle.line2}>
            <Text style={{ fontStyle: 'italic', color: 'rgb(8, 218, 95)', fontSize: 15 }}>
              {props.doctorType}
            </Text>
          </View>
          <View style={cardStyle.line3}>
            <Stars n={grade} />
            <Text style={cardStyle.note}>{props.doctorNote}</Text>
          </View>
        </View>
        <View style={{ width: props.rightMargin || 0 }}></View>
      </View>
    </TouchableOpacity>
  )
}

const IMAGE_SIZE = 70

const cardStyle = StyleSheet.create({
  container: {
    height: 110,
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    borderRadius: 3,
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'rgb(241,241,241)',
  },
  img: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    marginHorizontal: 30,
    left: 15,
  },
  content: {
    width: 200,
    height: 70,
    margin: 5,
  },
  line1: {
    width: '100%',
    height: 25,
    alignItems: 'center',
    flexDirection: 'row',
  },
  medicName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  line2: {
    width: '100%',
    height: 25,
    alignItems: 'center',
    flexDirection: 'row',
  },
  line3: {
    width: '100%',
    height: 25,
    alignItems: 'center',
    flexDirection: 'row',
  },
  note: {
    fontSize: 16,
    color: 'rgb(96,123,140)',
  },
})
