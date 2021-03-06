import {compile} from 'path-to-regexp'
import axios, {AxiosInstance} from 'axios'

import config, {
  headerTypeConfig,
  Interceptors,
  APIResponse,
  Endpoints,
  APIConfig,
  APIError,
  Rejected,
  Fulfilled,
  APIPromise,
  RequestInterceptor,
  ResponseInterceptor,
} from '../api.config'

class APIFactory {
  private key: string = 'kernel'

  public requests: {
    [key: string]: <D>(config?: APIConfig) => APIPromise<D>
  } = {}

  private apisConfig: {[key: string]: APIConfig[]} = {}

  private errorMap: {[key: string]: number} = {}

  private instance?: AxiosInstance

  private isServer: boolean = typeof window === 'undefined'

  private sectionsMap: string[] = []

  private sectionsDefaults: {[sectionKey: string]: APIConfig} = {}

  private requestsMap: string[] = []

  private interceptorsMap: string[] = []

  private interceptorWhitList: string[] = []

  constructor(endpoints: Endpoints, apiConfig: APIConfig = config) {
    this.createAxiosInstance(apiConfig)

    this.setupInternalInterceptors()

    this.addEndpoints(endpoints)

    this.createRequests(this.apisConfig)
  }

  public addEndpoints(newEndpoints: Endpoints) {
    const {interceptors, apisConfig, section, defaults} = newEndpoints

    if (apisConfig) this.setAPIs(section, apisConfig)

    if (interceptors) this.addInterceptors(section, interceptors)

    if (defaults) this.sectionsDefaults[section] = defaults

    this.createRequests(this.apisConfig)

    return this
  }

  public addInterceptors(section: string, interceptors: Interceptors) {
    const {response = [], request = [], force = false} = interceptors

    if (this.interceptorsMap.includes(section)) return this

    if (force) this.interceptorWhitList.push(section)

    this.interceptorsMap.push(section)

    this.deployInterceptors(section, {response, request})

    return this
  }

  private createAxiosInstance(configs: APIConfig) {
    const {type, ...apiConfigs} = configs

    const props = this.extractParams(apiConfigs)

    const headerType = APIFactory.type2Headers(type)

    const axiosConfigs = {...headerType, ...props}
    this.instance = axios.create(axiosConfigs)
  }

  private setAPIs(section: string, apisConfig: APIConfig[]) {
    if (this.sectionsMap.includes(section)) return

    this.sectionsMap.push(section)

    this.apisConfig[section] = apisConfig
  }

  private static type2Headers(type: APIConfig['type']) {
    return type ? headerTypeConfig[type] : {}
  }

  private extractParams(configs: APIConfig) {
    const {params = {}, staticParams = {}, ...rest} = configs

    const oldParams = this.instance?.defaults.params ?? {}

    const mergedParams = {...oldParams, ...staticParams, ...params}

    const props: APIConfig = rest
    props.params = mergedParams
    return props
  }

  private setupInternalInterceptors() {
    const errorInterceptor = this.getErrorInterceptor()

    this.interceptorsMap.push(this.key)

    this.interceptorWhitList.push(this.key)

    this.deployInterceptors(this.key, {response: [errorInterceptor]})
  }

  private deployInterceptors(section: string, interceptors: Interceptors) {
    const {response = [], request = []} = interceptors

    response.forEach(interceptor => {
      const handlers = this.imbedInstanceInResponse(interceptor, section)

      const onFulfilled = handlers[0] as Fulfilled
      const onRejected = handlers[1] as Rejected | undefined

      this.instance!.interceptors.response.use(onFulfilled, onRejected)
    })

    request.forEach(interceptor => {
      const handlers = this.imbedInstanceInRequest(interceptor, section)
      this.instance!.interceptors.request.use(...handlers)
    })

    return this
  }

  private canIntercept(key: string, endpoint: string) {
    if (this.interceptorWhitList.includes(key)) return true
    return key === endpoint
  }

  private imbedInstanceInResponse(
    handlers: ResponseInterceptor[],
    section: string
  ): ResponseInterceptor[] {
    return handlers.map((handler, index) => {
      if (index === 0) {
        const onFulfilled = handler as Fulfilled
        return (response: APIResponse) => {
          const {config} = response
          if (this.canIntercept(section, config.sectionKey!)) {
            return onFulfilled(response, this.instance)
          }
          return response
        }
      }
      return (error: APIError) => {
        const onRejected = handler as Rejected
        const {config} = error
        if (this.canIntercept(section, config.sectionKey!)) {
          return onRejected(error, this.instance)
        }
        return error
      }
    })
  }

  private imbedInstanceInRequest(
    handlers: RequestInterceptor[],
    section: string
  ): RequestInterceptor[] {
    return handlers.map(handler => (config: APIConfig) => {
      if (this.canIntercept(section, config.sectionKey!)) {
        return handler(config, this.instance)
      }
      return config
    })
  }

  private getErrorInterceptor() {
    const onSuccess: Fulfilled = response => {
      this.errorMap[response.config.url!] = 0
      return response
    }

    const onError: Rejected = async error => {
      const {response, code, config} = error as APIError
      const {url, maxRetry, showErrorMessage = true} = config

      config.transformRequest = data => data

      const errorCode = (code ?? response?.status) as string

      const count = this.errorMap[url!] ?? 1
      this.errorMap[url!] = count + 1

      let newResponse = null

      if (/408|ECONNABORTED/.test(errorCode) && count < maxRetry!) {
        config.timeout! /= 2
        newResponse = await this.instance!.request(config)
      }

      if (newResponse) return newResponse

      if (showErrorMessage) this.showAPIErrorMessage(errorCode, url!)

      return Promise.reject(error)
    }

    return [onSuccess, onError]
  }

  private showAPIErrorMessage(code: string, url: string) {
    if (this.isServer) return
    window.dispatchEvent(new CustomEvent('api-error', {detail: {code, url}}))
  }

  private createRequests(apisConfig: {[key: string]: APIConfig[]}) {
    Object.keys(apisConfig).forEach(sectionKey => {
      if (this.requestsMap.includes(sectionKey)) return

      const section = apisConfig[sectionKey]

      this.createInstances(sectionKey, section)

      this.requestsMap.push(sectionKey)
    })
  }

  private mergeConfigs(key: string, endpoint: APIConfig, props: APIConfig) {
    const defaults = this.instance?.defaults ?? {}

    const section = this.sectionsDefaults[key] ?? {}

    const merged: APIConfig = {...defaults, ...section, ...endpoint, ...props}

    const configs = this.extractParams(merged)

    const {type, urlParams = {}, url: rawURL = '', ...options} = configs

    const headerType = APIFactory.type2Headers(type)

    const toPath = compile(rawURL)
    const url = toPath(urlParams)

    const mergedConfigs: APIConfig = {url, ...options, ...headerType}

    return mergedConfigs
  }

  private async request(args: APIConfig) {
    return this.instance!.request(args)
      .then((response?: APIResponse) => response)
      .catch((error: APIError) => error)
  }

  private createInstances(sectionKey: string, section: APIConfig[]) {
    section.forEach(({key, ...config}: APIConfig) => {
      this.requests[key!] = (props: APIConfig = {}) => {
        const configs = this.mergeConfigs(sectionKey, config, props)
        return this.request({sectionKey, key, ...configs})
      }
    })
  }
}

export default APIFactory
