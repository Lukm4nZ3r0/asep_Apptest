import { Contact, ResponseAPI } from "../types";

export interface CustomHeader {
  Authorization: string;
  [key: string]: any;
}

export interface Params { [key: string]: any }

export interface CustomRequestOption {
  headers?: HeadersInit_ ;
  params: Params;
}

export interface CustomRequest {
  get: <T>(url: string, options?: CustomRequestOption) => Promise<T>;
  post: <T, U>(url: string, payload: U, options?: CustomRequestOption) => Promise<T>;
  put: <T, U>(url: string, payload: U, options?: CustomRequestOption) => Promise<T>;
  delete: <T>(url: string, options?: CustomRequestOption) => Promise<T>;
}

const urlWithParams = (url: string, params?: Params) => {
  if(params) return url + '?' + Object.entries(params).map(([key, value]) => `${key}=${value}`)
  else return url
}

export const request: CustomRequest = {
  get: (url, options) => new Promise((resolve, reject) => {
    fetch(urlWithParams(url, options?.params), {
      method: "GET",
      headers: options?.headers ?? { Accept: 'application/json', 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(res => resolve(res))
      .catch(err => reject(err))
  }),
  post: (url, payload, options) => new Promise((resolve, reject) => {
    fetch(urlWithParams(url, options?.params), {
      method: "POST",
      headers: options?.headers ?? { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: payload ? JSON.stringify(payload) : undefined
    })
      .then(res => res.json())
      .then(res => resolve(res))
      .catch(err => reject(err))
  }),
  put: (url, payload, options) => new Promise((resolve, reject) => {
    fetch(urlWithParams(url, options?.params), {
      method: "PUT",
      headers: options?.headers ?? { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: payload ? JSON.stringify(payload) : undefined
    })
      .then(res => res.json())
      .then(res => resolve(res))
      .catch(err => reject(err))
  }),
  delete: (url, options) => new Promise((resolve, reject) => {
    fetch(urlWithParams(url, options?.params), {
      method: "DELETE",
      headers: options?.headers ?? { Accept: 'application/json', 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(res => resolve(res))
      .catch(err => reject(err))
  }),
}

const BASE_URL = "https://simple-contact-crud.herokuapp.com"

export const getContacts = () => new Promise<ResponseAPI<Array<Contact>>>((resolve,reject) => {
  request.get<ResponseAPI<Array<Contact>>>(BASE_URL + "/contact")
    .then((res) => {
      res.data?.sort((a,b) => {
        if(a.firstName > b.firstName) return 1
        else return -1
      })
      res.data?.forEach(d => {
        if(d.photo === "N/A") d.photo = ""
      })
      resolve(res)
    })
    .catch((err) => reject(err))
})
export const getContactById = (id: string) => new Promise<ResponseAPI<Contact>>((resolve, reject)=> {
  request.get<ResponseAPI<Contact>>(BASE_URL + "/contact/" + id)
    .then((res) => {
      if(res.data?.photo === "N/A") res.data.photo = ""
      resolve(res)
    })
    .catch((err) => reject(err))
})
export const saveOrEditContact = (contact: Contact) => request[contact.id ? "put" : "post"]<ResponseAPI<undefined>, Contact>(BASE_URL + "/contact/" + contact.id ?? '', contact)
export const deleteContactById = (id: string) => request.delete<undefined>(BASE_URL + "/contact/" + id)