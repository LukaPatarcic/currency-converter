import { MMKV } from 'react-native-mmkv'

type MMKVValue = string | number | boolean | ArrayBuffer

export const storage = new MMKV({
  id: 'my-app-storage',
  encryptionKey: 'encryption-key',
})

export const mmkvStorage = {
  setItem: (key: string, value: MMKVValue) => storage.set(key, value),
  getItem: (key: string) => storage.getString(key) ?? null,
  removeItem: (key: string) => storage.delete(key),
}
