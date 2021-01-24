import React, { FC, ReactElement } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
  GestureResponderEvent,
} from 'react-native'
import startImg from '@/assets/star.png'
import location from '@/assets/location.png'

type DoctorCardPropType = {
  doctorName: string
  doctorType: string
  address: string
  doctorPhoto: ImageSourcePropType
  likes: string
  onClick: (e: GestureResponderEvent) => void
}

export const DoctorCard: FC<DoctorCardPropType> = (props: DoctorCardPropType): ReactElement => {
  const { address, doctorName, doctorPhoto, doctorType, likes } = props

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={props.onClick}>
      <View style={styles.container}>
        <Image style={styles.img} source={doctorPhoto} />
        <View style={styles.content}>
          <View style={styles.line1}>
            <Text style={styles.medicName}>{doctorName}</Text>
            <Image style={{ width: 20, height: 20, marginLeft: 15 }} source={startImg} />
            <Text style={{ marginLeft: 5, color: 'grey' }}>{likes}</Text>
          </View>
          <View style={styles.line2}>
            <Text style={{ fontStyle: 'italic', color: 'rgb(8, 218, 95)', fontSize: 15 }}>
              {doctorType}
            </Text>
          </View>
          <View style={styles.line3}>
            <Image style={{ width: 20, height: 25 }} source={location} />
            <Text style={{ marginLeft: 5, color: 'grey' }}>{address}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const IMAGE_SIZE = 70

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    borderRadius: 3,
    display: 'flex',
    flexDirection: 'row',
  },
  img: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
  },
  content: {
    width: 200,
    height: 70,
    margin: 20,
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
    // backgroundColor: 'yellow',
    width: '100%',
    height: 25,
    alignItems: 'center',
    flexDirection: 'row',
  },
})
