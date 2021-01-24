import { Post } from '@/store/Posts/types'

export async function fetchPosts(pageNumber: number, postsPerPage: number): Promise<Array<Post>> {
  const serverResponse = await fetch(
    `https://picsum.photos/v2/list?page=${pageNumber}&limit=${postsPerPage}`,
  )
  console.log(`FETCH: https://picsum.photos/v2/list?page=${pageNumber}&limit=${postsPerPage}`)

  if (serverResponse.status === 200 && serverResponse.ok) {
    const data = await serverResponse.json()

    const postsArray: Array<Post> = []
    for (let i = 0; i < data.length; i++) {
      const item = data[i]
      postsArray.push({
        author: item.author,
        base64Image: '',
        downloadImageUrl: item['download_url'],
        id: Number(item.id),
        webUrl: item['url'],
      })
    }
    return postsArray
  }

  throw Error(`Server response error, states=${serverResponse.status}`)
}
