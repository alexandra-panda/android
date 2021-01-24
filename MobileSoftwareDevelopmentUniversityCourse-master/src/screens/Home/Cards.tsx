import React, { Component, ReactElement } from 'react'
import { View, StyleSheet, Button, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import { Card } from '@/components/card/Card'
import { Animation1 } from '@/components/loadingAnimations'
import { GlobalStateType } from '@/store'
import { fetchNewPosts, fetchPostsFirstTime } from '@/store/Posts/actionCreators'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { routeNames } from '@/routes/routeNames'

function mapStateToProps(state: GlobalStateType) {
  return {
    isFetch: state.postsReducer.isFetch,
    posts: state.postsReducer.posts,
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  const actionCreators = { fetchNewPosts, fetchPostsFirstTime }
  return bindActionCreators(actionCreators, dispatch)
}

type CardsPropType = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    navigation: NavigationProp<ParamListBase>
  }

class Cards extends Component<CardsPropType> {
  componentDidMount(): void {
    if (!this.props.isFetch && this.props.posts.length === 0) {
      this.props.fetchPostsFirstTime()
    }
  }

  render(): ReactElement {
    const posts = this.props.posts
    const items = posts.length
      ? posts.map((a, i) => {
          const isOdd = i % 2 == 0
          return (
            <Card
              key={a.id}
              id={a.id}
              author={a.author}
              base64Image={a.base64Image}
              onInfoClick={() =>
                this.props.navigation.navigate(routeNames.WebViewScreen, {
                  urlPath: a.webUrl,
                })
              }
              bgColor={isOdd ? 'black' : 'white'}
              txtColor={isOdd ? 'white' : 'black'}
            />
          )
        })
      : null
    const isLoading = this.props.isFetch
    return (
      <View style={styles.container}>
        {items}
        {isLoading ? (
          <Animation1 />
        ) : (
          <View style={styles.buttonContainer}>
            <Button title="See more..." onPress={() => this.props.fetchNewPosts()} />
          </View>
        )}
      </View>
    )
  }
}

const BUTTON_WIDTH = 120

const styles = StyleSheet.create({
  container: {},
  buttonContainer: {
    marginVertical: 10,
    width: BUTTON_WIDTH,
    left: Dimensions.get('screen').width * 0.5 - BUTTON_WIDTH / 2,
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Cards)
