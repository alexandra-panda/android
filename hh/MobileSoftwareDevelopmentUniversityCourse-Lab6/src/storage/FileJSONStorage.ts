import RNFS from 'react-native-fs'
import { Storage } from './Storage'

export class FileJSONStorage<T> implements Storage<T> {
  async remove(key: string): Promise<void> {
    try {
      const path = RNFS.ExternalDirectoryPath + `/${key}.txt`
      await RNFS.unlink(path)
    } catch (e) {
      console.warn(`File ${key} doesn't exists!!!`)
    }
  }

  async save(key: string, data: T): Promise<void> {
    try {
      const path = RNFS.ExternalDirectoryPath + `/${key}.txt`
      const jsonStr = JSON.stringify(data)
      await RNFS.writeFile(path, jsonStr, 'utf8')
      console.log(`FileJSONStorage: File ${key} writtem with success.`)
    } catch (e) {
      console.warn(`FileJSONStorage: File ${key} error to write.`)
      console.warn(e)
    }
  }

  async load(key: string): Promise<T | null> {
    const path = RNFS.ExternalDirectoryPath + `/${key}.txt`
    let result = null

    try {
      const jsonExists = await RNFS.exists(path)
      if (!jsonExists) {
        throw new Error()
      }

      const jsonString = await RNFS.readFile(path, 'utf8')
      result = JSON.parse(jsonString) as T
      console.log(`FileJSONStorage: File ${key} loaded with success.`)

      return result
    } catch (error) {}

    return result
  }
}
