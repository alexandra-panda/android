import { BackArrow } from '@/components/BackArrow/BackArrow'
import { BottomMenu } from '@/components/BotomMenu/BottomMenu'
import { CustomHeader } from '@/components/CustomHeader/CustomHeader'
import { DoctorCard } from '@/components/DoctorCard/DoctorCard'
import { ThreePoints } from '@/components/Icons/ThreePoints/ThreePoints'
import { routeNames } from '@/routes/routeNames'
import { GlobalStateType } from '@/store'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import React, { Component, ReactElement } from 'react'
import { Alert, Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { setDoctorsActionCreator } from '@/store/Doctors/actionCreators'
import { DoctorType } from '@/store/Doctors/types'

function mapStateToProps(state: GlobalStateType) {
  return {
    notifications: state.notificationsReducer.notifications,
    doctors: state.doctorsReducer.doctors,
    token: state.authenticationReducer.token,
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  const creators = { setDoctorsActionCreator }
  return bindActionCreators(creators, dispatch)
}

type DoctorListScreenPropType = {
  navigation: NavigationProp<ParamListBase>
} & ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

type DoctorListScreenStateType = {
  isLoad: boolean
}

class DoctorListScreenComponent extends Component<
  DoctorListScreenPropType,
  DoctorListScreenStateType
> {
  constructor(props: DoctorListScreenPropType) {
    super(props)

    this.state = {
      isLoad: true,
    }

    this.fetchDoctors = this.fetchDoctors.bind(this)
  }

  componentDidMount(): void {
    this.fetchDoctors()
  }

  fetchDoctors(): void {
    // console.log(this.props.token)
    const options: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        token: this.props.token,
      },
    }

    fetch('http://81.180.72.17/api/Doctor/GetDoctorList', options)
      .then((res) => {
        res.json().then((d) => {
          if (res.status === 200) {
            // console.log(d)
            const docs = new Array<DoctorType>()
            d.forEach((a: any) => {
              docs.push({
                address: a.Address,
                description: a.About,
                grade: String(a.Stars),
                image: { uri: `data:image/gif;base64,${a.Photo}` },
                name: a.FullName,
                doctorId: a.DocId,
                specialisation: a.Specs,
              })
            })

            this.props.setDoctorsActionCreator(docs)
            this.setState({ isLoad: false })
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
    const content = this.state.isLoad ? (
      <ScrollView></ScrollView>
    ) : (
      <ScrollView showsVerticalScrollIndicator={false} style={styles.cardsContainer}>
        {this.props.doctors.map((item) => {
          return (
            <DoctorCard
              onClick={() =>
                this.props.navigation.navigate(routeNames.DoctorDetailsScreen, {
                  doctorId: item.doctorId,
                })
              }
              key={item.doctorId}
              address={item.address}
              doctorName={item.name}
              doctorType={item.specialisation}
              doctorPhoto={item.image}
              likes={item.grade}
            />
          )
        })}
        <View style={{ marginBottom: 30 }}></View>
      </ScrollView>
    )

    return (
      <View style={styles.container}>
        <View style={styles.childContainer}>
          <CustomHeader
            leftElement={<BackArrow onClick={() => this.props.navigation.goBack()} />}
            centerElement={<Text style={{ fontSize: 22, color: 'white' }}>Doctor List</Text>}
            rightElement={<ThreePoints onClick={() => console.log(1)} />}
          />
          {content}
        </View>
        <BottomMenu
          navigation={this.props.navigation}
          selected={'Home'}
          notificationsIsPresent={this.props.notifications.length > 0}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgb(240, 240, 240)',
  },
  childContainer: {
    width: '100%',
    height: Dimensions.get('screen').height - 50,
  },
  cardsContainer: {
    height: '100%',
    marginHorizontal: 15,
  },
})

export const DoctorListScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DoctorListScreenComponent)
