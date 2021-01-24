import { BottomMenu } from '@/components/BotomMenu/BottomMenu'
import { ButtonOne } from '@/components/ButtonOne/ButtonOne'
import { CustomHeader } from '@/components/CustomHeader/CustomHeader'
import { CustomTextInput } from '@/components/CustomTextInput/CustomTextInput'
import { ThreePoints } from '@/components/Icons/ThreePoints/ThreePoints'
import { rootGreenColor } from '@/constants'
import { GlobalStateType } from '@/store'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import React, { Component, ReactElement } from 'react'
import { View, StyleSheet, Text, ScrollView, Dimensions, Alert } from 'react-native'
import { connect } from 'react-redux'
import { setNotificationsActionCreator } from '@/store/Notifications/actionCreators'
import { bindActionCreators, Dispatch } from 'redux'
import { routeNames } from '@/routes/routeNames'

function mapStateToProps(state: GlobalStateType) {
  return {
    token: state.authenticationReducer.token,
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  const creators = { setNotificationsActionCreator }
  return bindActionCreators(creators, dispatch)
}

type DoctorListScreenPropType = {
  navigation: NavigationProp<ParamListBase>
} & ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

type HomeScreenStateType = {
  homeData: {
    name: string
    desease: string
    location: string
    description: string
  }
}

class HomeScreenComponent extends Component<DoctorListScreenPropType, HomeScreenStateType> {
  constructor(props: DoctorListScreenPropType) {
    super(props)

    this.state = {
      homeData: {
        description: '',
        desease: '',
        location: '',
        name: '',
      },
    }

    this.fetchDesease = this.fetchDesease.bind(this)
  }

  fetchDesease(): void {
    // console.log(this.state.homeData)
    const urlData = new URLSearchParams()
    urlData.append('Name', this.state.homeData.name)
    urlData.append('Disease', this.state.homeData.desease)
    urlData.append('Address', this.state.homeData.location)
    urlData.append('Description', this.state.homeData.description)

    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        token: this.props.token,
      },
      body: urlData.toString(),
    }

    fetch(`http://81.180.72.17/api/Doctor/AddConsultation`, options)
      .then((res) => {
        res.json().then((d) => {
          if (res.status === 200) {
            // console.log(d)
            this.props.setNotificationsActionCreator([
              {
                doctorId: d.DocId,
                description: d.Description,
                requestDetails: {
                  description: d.Description,
                  desease: d.Disease,
                  location: d.Address,
                  name: d.Name,
                },
              },
            ])

            this.props.navigation.navigate(routeNames.NotificationScreen)
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
        <View style={styles.childContainer}>
          <CustomHeader
            leftElement={<View style={{ width: 30 }} />}
            centerElement={<Text style={{ fontSize: 22, color: 'white' }}>Home</Text>}
            rightElement={<ThreePoints onClick={() => console.log(1)} />}
          />
          <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContainer}>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                marginTop: 40,
              }}
            >
              <ButtonOne
                style={{ width: 240 }}
                textColor={rootGreenColor}
                bgColor={'transparent'}
                borderColor={rootGreenColor}
                onClick={() => console.log('')}
              >
                VERY URGENT
              </ButtonOne>
            </View>
            <View style={styles.inputsContainer}>
              <Text style={styles.inputTitle}>Name</Text>
              <CustomTextInput
                onChangeText={(txt) => {
                  this.setState((prev) => ({
                    homeData: {
                      ...prev.homeData,
                      name: txt,
                    },
                  }))
                }}
                placeholder="Your Name"
              />

              <Text style={styles.inputTitle}>Desease</Text>
              <CustomTextInput
                onChangeText={(txt) => {
                  this.setState((prev) => ({
                    homeData: {
                      ...prev.homeData,
                      desease: txt,
                    },
                  }))
                }}
                placeholder="What is your illness"
              />

              <Text style={styles.inputTitle}>Location</Text>
              <CustomTextInput
                onChangeText={(txt) => {
                  this.setState((prev) => ({
                    homeData: {
                      ...prev.homeData,
                      location: txt,
                    },
                  }))
                }}
                placeholder="Where you location"
              />

              <Text style={styles.inputTitle}>Decription (Optional)</Text>
              <CustomTextInput
                onChangeText={(txt) => {
                  this.setState((prev) => ({
                    homeData: {
                      ...prev.homeData,
                      description: txt,
                    },
                  }))
                }}
                style={{ height: 90 }}
                multiline
                placeholder="Description Here"
              />
            </View>
            <View style={{ paddingHorizontal: 10, marginVertical: 25, marginBottom: 40 }}>
              <ButtonOne
                fullWidth
                textColor={'white'}
                bgColor={rootGreenColor}
                borderColor={rootGreenColor}
                onClick={this.fetchDesease}
              >
                Request
              </ButtonOne>
            </View>
          </ScrollView>
        </View>
        <BottomMenu
          navigation={this.props.navigation}
          selected={'Home'}
          notificationsIsPresent={true}
        />
      </View>
    )
  }
}

export const HomeScreen = connect(mapStateToProps, mapDispatchToProps)(HomeScreenComponent)

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgb(255, 255, 255)',
  },
  childContainer: {
    width: '100%',
    height: Dimensions.get('screen').height - 50,
  },
  scrollContainer: {
    height: '100%',
    marginHorizontal: 15,
  },
  inputsContainer: {
    padding: 10,
  },
  inputTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginVertical: 15,
    marginTop: 25,
    color: 'rgb(70, 70, 70)',
  },
})
