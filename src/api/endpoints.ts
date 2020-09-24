import {Endpoints} from './api.config'

const endpoints: Endpoints = {
  section: 'base',
  apisConfig: [
    {
      key: 'core',
      url: '/mobile/core',
      method: 'GET',
    },
  ],
  interceptors: {
    force: true,
    response: [],
    request: [],
  },
  defaults: {
    maxRetry: 5,
  },
}

export default endpoints
