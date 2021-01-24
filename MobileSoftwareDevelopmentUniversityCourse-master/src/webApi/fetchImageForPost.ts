export async function fetchImageForPost(imageId: number): Promise<string> {
  const serverResponse = await fetch(`https://picsum.photos/id/${imageId}/320/240`)
  if (serverResponse.ok && serverResponse.status === 200) {
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

    return base64Image
  } else {
    console.warn(`Fetch image error, status=${serverResponse.status}`)
  }

  throw new Error('Fetch image error')
}
