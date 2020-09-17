export const API_TYPES = {
  PROD: 'PROD',
  STAGING: 'STAGING',
}

const DEVELOPMENT_API_TYPE = API_TYPES.PROD

export const APIType = {
  env: process.env.NODE_ENV,
  isStaging: process.env.IS_STAGING,

  toString() {
    if (this.env === 'production') {
      if (this.isStaging) return API_TYPES.STAGING
      return API_TYPES.PROD
    }
    return DEVELOPMENT_API_TYPE
  },
}

export default {}
