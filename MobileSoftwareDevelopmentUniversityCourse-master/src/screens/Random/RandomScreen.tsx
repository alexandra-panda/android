import React, { ReactElement, useState, useCallback, useEffect, useRef } from 'react'
import { Dimensions, View, StyleSheet, Button } from 'react-native'
import { Card } from '@/components/card/Card'
import { Post } from '@/store/Posts/types'
import { fetchRandomPost } from '@/webApi'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { routeNames } from '@/routes/routeNames'

type RandomScreenPropType = {
  navigation: NavigationProp<ParamListBase>
}

async function fetchRandomPostCallback(): Promise<Post> {
  try {
    const post: Post = await fetchRandomPost()
    return post
  } catch (error) {
    console.warn('FETCH RANDOM POST ERROR: ', error)
  }

  return {
    author: '',
    base64Image: '',
    downloadImageUrl: '',
    id: 0,
    webUrl: '',
  }
}

export default function RandomScreen(props: RandomScreenPropType): ReactElement {
  const componentIsMounted = useRef(true)
  const [post, setPost] = useState<Post>({
    author: '',
    base64Image: '',
    downloadImageUrl: '',
    id: 0,
    webUrl: '',
  })

  const onNewRandomButtonClick = useCallback(() => {
    fetchRandomPostCallback().then((post: Post) => {
      if (componentIsMounted.current) {
        setPost({ ...post })
      }
    })
  }, [])

  useEffect(() => {
    fetchRandomPostCallback().then((post: Post) => {
      if (componentIsMounted.current) {
        setPost({ ...post })
      }
    })

    return () => {
      componentIsMounted.current = false
    }
  }, [])

  return (
    <View>
      <Card
        id={post.id}
        author={post.author}
        base64Image={post.base64Image}
        onInfoClick={() =>
          props.navigation.navigate(routeNames.WebView, {
            urlPath: post.webUrl,
          })
        }
      />
      <View style={styles.buttonContainer}>
        <Button title="New random" onPress={onNewRandomButtonClick} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  buttonContainer: {
    marginVertical: 10,
    width: 125,
    left: Dimensions.get('screen').width * 0.5 - 125 / 2,
  },
})
