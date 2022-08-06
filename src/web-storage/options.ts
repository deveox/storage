export type WebStorageOptions = {
  prefix: string,
  separator: string,
  hasSync?: boolean
}

export const defaults: WebStorageOptions = {
  prefix: "",
  separator: ":"
}