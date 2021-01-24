import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React, { FC, ReactElement } from 'react'
import { routes } from './routes'

const Stack = createStackNavigator()

const AppNavigator: FC = (): ReactElement => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {Object.keys(routes).map((key) => (
          <Stack.Screen
            key={key}
            name={routes[key].routeName}
            component={routes[key].component}
            options={({ navigation }) => ({
              // eslint-disable-next-line react/display-name
              header: (props) => null,

              animationEnabled: true,
              navigation,
            })}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator
