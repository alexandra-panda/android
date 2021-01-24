import { Post } from '@/store/Posts/types'

/**
 * @throws Error if request fail or status!=200
 */
export async function fetchRandomPost(): Promise<Post> {
  const serverResponse = await fetch(`https://picsum.photos/320/240`)
  if (serverResponse.status === 200 && serverResponse.ok) {
    //@ts-ignore
    const id: number = serverResponse.headers.map['picsum-id']

    const bufferImage = await serverResponse.blob()
    const reader = new FileReader()
    reader.readAsDataURL(bufferImage)
    const base64Image = await new Promise<string>((resolve) => {
      reader.onloadend = function () {
        const dataUrl = reader.result as string
        const base64 = dataUrl.split(',')[1]
        resolve(base64)
      }
    })

    const serverResponse2 = await fetch(`https://picsum.photos/id/${id}/info`)
    const postInfo = await serverResponse2.json()
    // console.log(postInfo)

    const result: Post = {
      id,
      author: postInfo['author'],
      webUrl: postInfo['url'],
      downloadImageUrl: postInfo['download_url'],
      base64Image,
    }

    return result
  }

  throw Error(`Server response error, status=${serverResponse.status}`)
}
