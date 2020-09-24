import APIFactory from './APIFactory'
import endpoints from './endpoints'

export {APIFactory}

export type {Endpoints} from './api.config'

export {isAPIError, isAPIResponse} from './api.config'

export default new APIFactory(endpoints)
