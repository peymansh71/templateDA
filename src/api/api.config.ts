import qs from 'querystring'
import {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosInstance,
  AxiosError,
} from 'axios'

import { APIType, API_TYPES } from '../app.config.js'


export const HOST_NAMES = {
  [API_TYPES.PROD]: 'https://snappfood.ir',
  [API_TYPES.STAGING]: 'https://staging.snappfood.ir',
}

type BodyTypes = 'form' | 'json'

export interface APIConfig extends AxiosRequestConfig {
  key?: string
  type?: BodyTypes
  maxRetry?: number
  sectionKey?: string
  showErrorMessage?: boolean
  urlParams?: object
  staticParams?: {[key: string]: string}
}

export interface APIResponse<D = any> extends AxiosResponse<D> {
  config: APIConfig
}

export interface APIError<D = any> extends AxiosError<D> {
  config: APIConfig
  response?: APIResponse<D>
}

export type Configurable<D = any> = APIError<D> | APIResponse<D>

export interface Fulfilled<T = AxiosInstance, D = any> {
  (response: APIResponse<D>, instance?: T):
    | APIResponse<D>
    | Promise<APIResponse<D>>
}

export interface Rejected<T = AxiosInstance, D = any> {
  (error: APIError<D>, instance?: T): Configurable<D> | Promise<Configurable<D>>
}

export type APIPromise<D = any> = Promise<
  APIResponse<D> | APIError<D> | undefined
>

export interface RequestInterceptor<T = AxiosInstance> {
  (config: APIConfig, instance?: T): APIConfig | Promise<APIConfig>
}
export type ResponseInterceptor<T = AxiosInstance, D = any> =
  | Fulfilled<T, D>
  | Rejected<T, D>

export interface Interceptors<T = AxiosInstance> {
  force?: boolean
  response?: ResponseInterceptor<T>[][]
  request?: RequestInterceptor<T>[][]
}

export interface Endpoints<T = AxiosInstance> {
  section: string
  apisConfig?: APIConfig[]
  interceptors?: Interceptors<T>
  defaults?: APIConfig
}

interface BodyTypeConfig {
  form: APIConfig
  json: APIConfig
}

export function isAPIResponse(
  result: APIResponse | APIError | undefined
): result is APIResponse {
  return (result as APIResponse)?.data !== undefined
}

export function isAPIError(
  result: APIResponse | APIError | undefined
): result is APIError {
  return (result as APIError)?.isAxiosError !== undefined
}

export const headerTypeConfig: BodyTypeConfig = {
  form: {
    transformRequest: [data => qs.stringify(data)],
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  },
  json: {
    transformRequest: data => JSON.stringify(data),
    headers: {'Content-Type': 'application/json'},
  },
}

const axiosConfig: APIConfig = {
  get baseURL() {
    return HOST_NAMES[APIType.toString()]
  },
  maxRetry: 3,
  type: 'form',
  timeout: 9000,
  maxRedirects: 0,
  withCredentials: true,
  validateStatus: status => status >= 200 && status <= 400,
  staticParams: {},
}

export default axiosConfig
