import { BackArrow } from '@/components/BackArrow/BackArrow'
import { BottomMenu } from '@/components/BotomMenu/BottomMenu'
import { CustomHeader } from '@/components/CustomHeader/CustomHeader'
import { ThreePoints } from '@/components/Icons/ThreePoints/ThreePoints'
import { routeNames } from '@/routes/routeNames'
import { GlobalStateType } from '@/store'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import React, { Component, Fragment, ReactElement } from 'react'
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import { connect } from 'react-redux'

function mapStateToProps(state: GlobalStateType) {
  return {
    token: state.authenticationReducer.token,
  }
}

type ProfileScreenPropType = {
  navigation: NavigationProp<ParamListBase>
} & ReturnType<typeof mapStateToProps>

type ProfileScreenStateType = {
  info: {
    FullName: string
    Birthday: string
    Email: string
    Phone: string
    Address: string
    Username: string
    Base64Photo: string
  }
  isLoad: boolean
}

class ProfileScreenComponent extends Component<ProfileScreenPropType, ProfileScreenStateType> {
  constructor(props: ProfileScreenPropType) {
    super(props)

    this.state = {
      info: {
        Address: '',
        Base64Photo: '',
        Birthday: '',
        Email: '',
        FullName: '',
        Phone: '',
        Username: '',
      },
      isLoad: true,
    }

    this.fetchData = this.fetchData.bind(this)
  }

  componentDidMount(): void {
    this.fetchData()
  }

  fetchData(): void {
    const options: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        token: this.props.token,
      },
    }

    fetch(`http://81.180.72.17/api/Profile/GetProfile`, options)
      .then((res) => {
        res.json().then((d) => {
          if (res.status === 200) {
            this.setState({
              info: {
                ...d,
              },
              isLoad: false,
            })
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
          centerElement={<Text style={{ fontSize: 22, color: 'white' }}>Profile</Text>}
          rightElement={<ThreePoints onClick={() => console.log(1)} />}
        />

        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {!this.state.isLoad && (
            <Fragment>
              <TouchableOpacity>
                <View style={styles.addPhotos}>
                  <Image
                    style={{ height: 200, width: 200 }}
                    source={{ uri: `data:image/gif;base64,${this.state.info.Base64Photo}` }}
                  />
                </View>
              </TouchableOpacity>
              <View>
                <Text style={styles.title}>Username</Text>
                <Text style={styles.text}>{this.state.info.Username}</Text>
              </View>
              <View>
                <Text style={styles.title}>Full Name</Text>
                <Text style={styles.text}>{this.state.info.FullName}</Text>
              </View>
              <View>
                <Text style={styles.title}>Birthday</Text>
                <Text style={styles.text}>{this.state.info.Birthday.split('T')[0]}</Text>
              </View>
              <View>
                <Text style={styles.title}>Email</Text>
                <Text style={styles.text}>{this.state.info.Email}</Text>
              </View>
              <View>
                <Text style={styles.title}>Address</Text>
                <Text style={styles.text}>{this.state.info.Address}</Text>
              </View>
              <View>
                <Text style={styles.title}>Phone</Text>
                <Text style={styles.text}>{this.state.info.Phone}</Text>
              </View>
            </Fragment>
          )}
        </ScrollView>

        <BottomMenu navigation={this.props.navigation} selected={'Home'} notificationsIsPresent />
      </View>
    )
  }
}

export const ProfileScreen = connect(mapStateToProps)(ProfileScreenComponent)

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
  addPhotos: {
    alignItems: 'center',
    margin: 25,
    marginTop: 45,
    marginBottom: 10,
  },
})
