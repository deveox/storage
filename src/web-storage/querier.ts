export interface WebStorageQuerier {
  get<T>(byDefault: T): T
  key(key: string): WebStorageQuerier
  set(value: any): boolean
  remove(): boolean
}

export function WebStorageQuery(key: string, storage: Storage): WebStorageQuerier {
  return {
    get(byDefault) {
      const data = storage.getItem(key)
      return data !== null ? JSON.parse(data) : byDefault
    },
    key(key) {
      return WebStorageQuery(key, storage)
    },
    set(value) {
      try {
        if (value === undefined) {
          return this.remove()
        } else {
          storage.setItem(key, JSON.stringify(value))
        }
        return true
      } catch {
        return false
      }
    },
    remove() {
      try {
        storage.removeItem(key)
        return true
      } catch {
        return false
      }
    }
  }
}
