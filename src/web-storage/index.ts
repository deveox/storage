import { defaults, WebStorageOptions } from "./options"
import { WebStorageQuery } from "./querier"

export type WebStorageType = "localStorage" | "sessionStorage"
export type WebStorageKey = string | symbol

export class WebStorage {
  #o!: WebStorageOptions
  #type: WebStorageType
  constructor(type: WebStorageType = "localStorage", options?: WebStorageOptions) {
    this.#type = type
    this.config(options || defaults)
  }

  config(options: WebStorageOptions) {
    this.#o = options
  }
  key(...keys: WebStorageKey[]) {
    return WebStorageQuery([this.#o.prefix, ...keys].join(this.#o.separator), window[this.#type])
  }

  proxy(target: Record<string, unknown>, name = 'proxy') {
    const map: Record<string | symbol, boolean> = {}
    const ws = this.key(name)
    return new Proxy(target, {
      get: (target, prop, receiver) => {
        if (map[prop] || typeof prop === 'symbol') {
          return Reflect.get(target, prop, receiver)
        }
        map[prop] = true
        return ws.key(prop).get(Reflect.get(target, prop, receiver))
      },
      set: (target, prop, value, receiver) => {
        if (typeof prop !== 'symbol') {
          ws.key(prop).set(value)
        }
        return Reflect.set(target, prop, value, receiver)
      }
    })
  }

}




