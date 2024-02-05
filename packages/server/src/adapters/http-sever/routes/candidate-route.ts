import { type Router } from 'express'
import { expressRouteAdapter } from '../express-route-adapter'
import { makeAddCandidate } from '../factories/add-candidate'

export default (router: Router): void => {
  router.post('/candidates', expressRouteAdapter(makeAddCandidate()))
}
