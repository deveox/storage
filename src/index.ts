import { WebStorage } from "./web-storage";
export { WebStorage }
export { WebStorageQuery } from "./web-storage/querier";


export const LocalStorage = new WebStorage("localStorage")
export const SessionStorage = new WebStorage("sessionStorage")