import { ButtonOne } from '@/components/ButtonOne/ButtonOne'
import React, { Component, ReactElement } from 'react'
import { View, Text, StyleSheet, Dimensions, TextInput, Alert } from 'react-native'
import { UserIcon } from '@/components/UserIcon/UserIcon'
import { LockIcon } from '@/components/LockIcon/LockIcon'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { routeNames } from '@/routes/routeNames'
import { AppLayout } from '@/components/Layout/AppLayout'
import { connect } from 'react-redux'
import { GlobalStateType } from '@/store'
import { bindActionCreators, Dispatch } from 'redux'
import { setAuthActionCreator } from '@/store/Authentication/actionCreators'

function mapStateToProps(state: GlobalStateType) {
  return {
    isAuthenticated: state.authenticationReducer.isAuthenticated,
    token: state.authenticationReducer.token,
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  const creators = { setAuthActionCreator }
  return bindActionCreators(creators, dispatch)
}

type LoginScreenPropType = {
  navigation: NavigationProp<ParamListBase>
} & ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

type LoginScreenStateType = {
  email: string
  password: string
}

class LoginScreenComponent extends Component<LoginScreenPropType, LoginScreenStateType> {
  constructor(props: LoginScreenPropType) {
    super(props)
    this.state = {
      email: '',
      password: '',
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.fetchAuth = this.fetchAuth.bind(this)
  }

  fetchAuth() {
    const urlData = new URLSearchParams()
    urlData.append('Email', this.state.email)
    urlData.append('Password', this.state.password)

    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: urlData.toString(),
    }

    fetch('http://81.180.72.17/api/Login/UserAuth', options)
      .then((res) => {
        res.json().then((d) => {
          if (res.status === 200) {
            Alert.alert('Success', 'Login with success!!!')
            this.props.setAuthActionCreator(true, d.Message)
            this.props.navigation.navigate(routeNames.DoctorListScreen)
            console.log(d.Message)
          } else {
            Alert.alert('Invalid request', d.Message)
            console.log(d)
          }
        })
      })
      .catch((err) => console.error(err))
  }

  onSubmit(): void {
    this.fetchAuth()
  }

  render(): ReactElement {
    return (
      <AppLayout>
        <View style={styles.container}>
          <Text style={styles.logo}>Telemedicine</Text>
          <View style={styles.inputsContainer}>
            <View>
              <UserIcon />
              <TextInput
                onChangeText={(text: string) => this.setState({ email: text })}
                placeholderTextColor="#fff"
                placeholder="Email Addres"
                style={styles.textInput}
              />
            </View>
            <View>
              <LockIcon />

              <TextInput
                secureTextEntry
                onChangeText={(text: string) => this.setState({ password: text })}
                placeholderTextColor="#fff"
                placeholder="Password"
                style={styles.textInput}
              />
            </View>
            <ButtonOne
              style={styles.buttonStyles}
              bgColor="white"
              borderColor="white"
              onClick={this.onSubmit}
              fullWidth
            >
              Login
            </ButtonOne>
            <ButtonOne
              style={styles.buttonStyles}
              bgColor="transparent"
              borderColor="transparent"
              textColor="white"
              onClick={() => this.props.navigation.navigate(routeNames.SignUpScreen)}
              fullWidth
            >
              SIGNUP
            </ButtonOne>
          </View>
        </View>
      </AppLayout>
    )
  }
}

const LoginScreen = connect(mapStateToProps, mapDispatchToProps)(LoginScreenComponent)

export default LoginScreen

const TOP_MARGIN = 0.16

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  logo: {
    top: Dimensions.get('screen').height * (TOP_MARGIN + 0.0),
    fontSize: 34,
    color: 'white',
    position: 'absolute',
  },
  inputsContainer: {
    // padding: Dimensions.get('screen').width * 0.05,
    padding: 20,
    width: '100%',
    // backgroundColor: 'red',
    top: '37%',
    position: 'absolute',
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'rgb(235, 235, 235)',
    borderRadius: 6,
    paddingHorizontal: 45,
    paddingVertical: 12,
    marginVertical: 10,
    color: 'white',
  },
  buttonStyles: {
    marginVertical: 35,
  },
})
