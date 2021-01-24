import { BackArrow } from '@/components/BackArrow/BackArrow'
import { BottomMenu } from '@/components/BotomMenu/BottomMenu'
import { CustomHeader } from '@/components/CustomHeader/CustomHeader'
import { ThreePoints } from '@/components/Icons/ThreePoints/ThreePoints'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import React, { Component, ReactElement } from 'react'
import { ScrollView, View, Text, StyleSheet, Dimensions } from 'react-native'
import { GlobalStateType } from '@/store'
import { connect } from 'react-redux'
import { AproveComponent } from './AprovedComponent'
import { RequestDetails } from './RequestDetails'
import { DoctorInfo } from './DoctorInfo'
import { ButtonOne } from '@/components/ButtonOne/ButtonOne'
import { rootGreenColor } from '@/constants'

function mapStateToProps(state: GlobalStateType) {
  return {
    notifications: state.notificationsReducer.notifications,
    doctors: state.doctorsReducer.doctors,
  }
}

type DoctorListScreenPropType = {
  navigation: NavigationProp<ParamListBase>
} & ReturnType<typeof mapStateToProps>

class NotificationScreenComponent extends Component<DoctorListScreenPropType> {
  constructor(props: DoctorListScreenPropType) {
    super(props)
  }

  render(): ReactElement {
    const doctorIndex = this.props.doctors.findIndex(
      (a) => +a.doctorId === +this.props.notifications[0].doctorId,
    )

    const showDoctor = doctorIndex > -1

    return (
      <View style={styles.container}>
        <View style={styles.childContainer}>
          <CustomHeader
            leftElement={<BackArrow onClick={() => this.props.navigation.goBack()} />}
            centerElement={<Text style={{ fontSize: 22, color: 'white' }}>Notification</Text>}
            rightElement={<ThreePoints onClick={() => console.log(1)} />}
          />
          <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
            {this.props.notifications.map((item, index) => {
              return (
                <View key={index}>
                  <AproveComponent description={item.description} />
                  <RequestDetails
                    description={item.requestDetails.description}
                    desease={item.requestDetails.desease}
                    location={item.requestDetails.location}
                    name={item.requestDetails.name}
                  />
                  {showDoctor && (
                    <DoctorInfo
                      navigation={this.props.navigation}
                      doctorImage={this.props.doctors[doctorIndex].image}
                      doctorName={this.props.doctors[doctorIndex].name}
                      doctorNote={this.props.doctors[doctorIndex].grade}
                      doctorType={this.props.doctors[doctorIndex].specialisation}
                      doctorId={this.props.doctors[doctorIndex].doctorId}
                    />
                  )}
                </View>
              )
            })}
            <View style={styles.buttonsContainer}>
              <ButtonOne
                textColor="white"
                style={{ marginTop: 35 }}
                fullWidth
                bgColor={rootGreenColor}
                borderColor={rootGreenColor}
                onClick={() => console.log(1)}
              >
                Confirm
              </ButtonOne>
              <ButtonOne
                textColor="rgb(144, 164, 173)"
                fullWidth
                style={{ marginTop: 30, marginBottom: 15 }}
                bgColor={'transparent'}
                borderColor={'rgb(144, 164, 173)'}
                onClick={() => console.log(1)}
              >
                Cancel Request
              </ButtonOne>
            </View>
          </ScrollView>
        </View>
        <BottomMenu
          navigation={this.props.navigation}
          selected={'Notification'}
          notificationsIsPresent={false}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  childContainer: {
    width: '100%',
    height: Dimensions.get('screen').height - 50,
  },
  scrollView: {
    height: '100%',
    marginHorizontal: 10,
  },
  buttonsContainer: {
    margin: 20,
  },
})

export const NotificationScreen = connect(mapStateToProps)(NotificationScreenComponent)
