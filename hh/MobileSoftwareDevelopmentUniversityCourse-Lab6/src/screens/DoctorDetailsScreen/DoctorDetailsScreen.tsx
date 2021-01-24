import { BackArrow } from '@/components/BackArrow/BackArrow'
import { CustomHeader } from '@/components/CustomHeader/CustomHeader'
import { DoctorCardA } from '@/components/DoctorCardA/DoctorCardA'
import { ThreePoints } from '@/components/Icons/ThreePoints/ThreePoints'
import { GlobalStateType } from '@/store'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import React, { Component, ReactElement } from 'react'
import { ScrollView, StyleSheet, Text, View, Image, ImageSourcePropType, Alert } from 'react-native'
import { connect } from 'react-redux'
import location from '@/assets/location.png'
import maps from '@/assets/maps.png'
import { ButtonOne } from '@/components/ButtonOne/ButtonOne'
import { rootGreenColor } from '@/constants'
import { BottomMenu } from '@/components/BotomMenu/BottomMenu'
import { routeNames } from '@/routes/routeNames'

function mapStateToProps(state: GlobalStateType) {
  return {
    token: state.authenticationReducer.token,
  }
}

type DoctorDetailsScreenComponentPropType = {
  navigation: NavigationProp<ParamListBase>
  route: {
    params: {
      doctorId: string
    }
  }
} & ReturnType<typeof mapStateToProps>

type DoctorDetailsScreenComponentStateType = {
  doctor: {
    doctorName: string
    doctorType: string
    doctorNote: string
    doctorImage: ImageSourcePropType
    doctorLocation: string
    doctorDescription: string
    doctorId: number
  }
}

export class DoctorDetailsScreenComponent extends Component<
  DoctorDetailsScreenComponentPropType,
  DoctorDetailsScreenComponentStateType
> {
  constructor(props: DoctorDetailsScreenComponentPropType) {
    super(props)
    const doctorId = props.route.params.doctorId
    this.state = {
      doctor: {
        doctorImage: {},
        doctorName: '',
        doctorNote: '',
        doctorType: '',
        doctorLocation: '',
        doctorDescription: '',
        doctorId: Number(doctorId),
      },
    }

    this.fetchDoctorInfo = this.fetchDoctorInfo.bind(this)
  }

  componentDidMount(): void {
    this.fetchDoctorInfo()
  }

  fetchDoctorInfo(): void {
    const options: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        token: this.props.token,
      },
    }

    fetch(`http://81.180.72.17/api/Doctor/GetDoctor/${this.state.doctor.doctorId}`, options)
      .then((res) => {
        res.json().then((d) => {
          if (res.status === 200) {
            this.setState({
              doctor: {
                doctorLocation: d.Address,
                doctorDescription: d.About,
                doctorId: d.DocId,
                doctorNote: String(d.Stars),
                doctorImage: { uri: `data:image/gif;base64,${d.Photo}` },
                doctorName: d.FullName,
                doctorType: d.Specs,
              },
            })

            console.log(d.DocId)
          } else {
            if (res.status === 401) {
              Alert.alert('Sessia de autentificare a expirat')
              this.props.navigation.navigate(routeNames.LoginScreen)
            } else {
              Alert.alert('Invalid request', d.Message)
              console.log(d, res.status)
            }
          }
        })
      })
      .catch((err) => console.error(err))
  }

  render(): ReactElement {
    return (
      <View style={styles.container}>
        <CustomHeader
          leftElement={<BackArrow onClick={() => this.props.navigation.goBack()} />}
          centerElement={<Text style={{ fontSize: 22, color: 'white' }}>Doctor Details</Text>}
          rightElement={<ThreePoints onClick={() => console.log(1)} />}
        />
        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <DoctorCardA
            doctorImage={this.state.doctor.doctorImage}
            rightMargin={40}
            style={{
              borderColor: 'transparent',
              borderBottomColor: 'rgb(241,241,241)',
            }}
            onClick={() => console.log(1)}
            doctorName={this.state.doctor.doctorName}
            doctorNote={this.state.doctor.doctorNote}
            doctorType={this.state.doctor.doctorType}
          />
          <View style={{ padding: 10 }}>
            <Text style={styles.title}>Short description</Text>
            <Text style={styles.text}>{this.state.doctor.doctorDescription}</Text>
          </View>
          <View style={{ padding: 10 }}>
            <Text style={styles.title}>Location</Text>
            <View
              style={{
                width: '100%',
                height: 25,
                alignItems: 'center',
                flexDirection: 'row',
                marginVertical: 15,
              }}
            >
              <Image style={{ width: 20, height: 25 }} source={location} />
              <Text style={{ marginLeft: 5, color: 'grey' }}>
                {this.state.doctor.doctorLocation}
              </Text>
            </View>
          </View>
          <View>
            <Image style={styles.maps} source={maps} />
          </View>
          <View>
            <ButtonOne
              textColor="white"
              style={{ marginVertical: 35 }}
              fullWidth
              bgColor={rootGreenColor}
              borderColor={rootGreenColor}
              onClick={() => console.log(1)}
            >
              Request
            </ButtonOne>
          </View>
        </ScrollView>
        <BottomMenu navigation={this.props.navigation} selected={'Home'} notificationsIsPresent />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgb(255, 255, 255)',
  },
  scrollContainer: {
    height: '100%',
    marginHorizontal: 15,
  },
  title: {
    fontWeight: '700',
    marginTop: 25,
    color: 'rgb(56,71,78)',
    fontSize: 18,
  },
  text: {
    marginTop: 12,
    color: 'rgb(96,123,140)',
    lineHeight: 24,
    fontSize: 16,
  },
  maps: {
    width: 400,
    height: 210,
  },
})

export const DoctorDetailsScreen = connect(mapStateToProps)(DoctorDetailsScreenComponent)
