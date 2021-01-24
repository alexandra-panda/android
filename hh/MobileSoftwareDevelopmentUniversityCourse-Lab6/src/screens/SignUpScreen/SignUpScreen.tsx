import { rootGreenColor } from '@/constants'
import React, { Component, ReactElement } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { UserAddPhoto } from '@/components/UserAddPhoto'
import { CustomTextInput } from '@/components/CustomTextInput/CustomTextInput'
import { ButtonOne } from '@/components/ButtonOne/ButtonOne'
import { CustomHeader } from '@/components/CustomHeader/CustomHeader'
import { BackArrow } from '@/components/BackArrow/BackArrow'
import ImagePicker from 'react-native-image-picker'
import { routeNames } from '@/routes/routeNames'

const HARD_CODE = {
  FullName: 'Jimmy',
  Birthday: '2020/10/18',
  Email: 'ezqraaieqddir@mail.ru',
  Phone: '069999999',
  Address: 'AbcCdeEfgHij',
  Username: 'ajfkdajkf',
  Password: 'qrqerqer',
}

type SignUpScreenPropType = {
  navigation: NavigationProp<ParamListBase>
}

type SignUpScreenStateType = {
  Base64Photo: string
  FullName: string
  Birthday: string
  Email: string
  Phone: string
  Address: string
  Username: string
  Password: string
}

export default class SignUpScreen extends Component<SignUpScreenPropType, SignUpScreenStateType> {
  constructor(props: SignUpScreenPropType) {
    super(props)

    this.state = {
      Base64Photo: '',
      ...HARD_CODE,
    }

    this.uploadPhoto = this.uploadPhoto.bind(this)
    this.register = this.register.bind(this)
  }

  uploadPhoto(): void {
    const options = {
      title: 'Select Avatar',
      customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    }

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      } else {
        this.setState({ Base64Photo: response.data })
      }
    })
  }

  register(): void {
    const urlData = new URLSearchParams()
    const { Address, Birthday, Email, FullName, Password, Phone, Username } = this.state

    let { Base64Photo } = this.state

    urlData.append('FullName', FullName)
    urlData.append('Birthday', Birthday)
    urlData.append('Email', Email)
    urlData.append('Phone', Phone)
    urlData.append('Address', Address)
    urlData.append('Username', Username)
    urlData.append('Password', Password)

    while (Base64Photo.length % 4 != 0) {
      Base64Photo += '='
    }
    urlData.append('Base64Photo', Base64Photo)

    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: urlData.toString(),
    }

    fetch('http://81.180.72.17/api/Register/UserReg', options)
      .then((res) => {
        res.json().then((d) => {
          if (res.status === 201) {
            Alert.alert('Success', 'Registration with success!!!')
            this.props.navigation.navigate(routeNames.LoginScreen)
          } else {
            Alert.alert('Invalid data', d.Message)
            console.log(d)
          }
        })
      })
      .catch((err) => console.error(err))
  }

  render(): ReactElement {
    return (
      <ScrollView style={styles.container}>
        <CustomHeader
          leftElement={<BackArrow onClick={() => this.props.navigation.goBack()} />}
          centerElement={<Text style={{ fontSize: 22, color: 'white' }}>Register</Text>}
          rightElement={<View style={{ width: 30 }} />}
        />
        <TouchableOpacity onPress={this.uploadPhoto}>
          <View style={styles.addPhotos}>
            {this.state.Base64Photo.length > 0 ? (
              <Image
                style={{ height: 200, width: 200 }}
                source={{ uri: `data:image/gif;base64,${this.state.Base64Photo}` }}
              />
            ) : (
              <UserAddPhoto />
            )}
          </View>
        </TouchableOpacity>
        <View style={styles.inputsContainer}>
          <Text style={styles.inputTitle}>Full Name</Text>
          <CustomTextInput
            placeholder="Your Full Name"
            onChangeText={(t) => this.setState({ FullName: t })}
          />

          <Text style={styles.inputTitle}>Birthay</Text>
          <CustomTextInput
            placeholder="yyyy/MM/dd"
            onChangeText={(t) => this.setState({ Birthday: t })}
          />

          <Text style={styles.inputTitle}>Email</Text>
          <CustomTextInput
            placeholder="Your Email"
            onChangeText={(t) => this.setState({ Email: t })}
          />

          <Text style={styles.inputTitle}>Phone Number</Text>
          <CustomTextInput
            placeholder="Your Phone Number"
            onChangeText={(t) => this.setState({ Phone: t })}
          />

          <Text style={styles.inputTitle}>Location/Adress</Text>
          <CustomTextInput
            placeholder="Your Location"
            onChangeText={(t) => this.setState({ Address: t })}
          />

          <Text style={styles.inputTitle}>Username</Text>
          <CustomTextInput
            placeholder="Username"
            onChangeText={(t) => this.setState({ Username: t })}
          />

          <Text style={styles.inputTitle}>Password</Text>
          <CustomTextInput
            secureTextEntry
            placeholder=""
            onChangeText={(t) => this.setState({ Password: t })}
          />

          <View style={{ marginTop: 25 }} />
          <ButtonOne
            textColor="white"
            fullWidth
            bgColor={rootGreenColor}
            borderColor={rootGreenColor}
            onClick={this.register}
          >
            Next
          </ButtonOne>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },

  addPhotos: {
    alignItems: 'center',
    margin: 25,
    marginTop: 45,
    marginBottom: 10,
  },
  inputsContainer: {
    padding: 20,
  },
  inputTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginVertical: 15,
    marginTop: 25,
    color: 'rgb(70, 70, 70)',
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
})
