import express from 'express'

import pl8Controller from '../controllers/pl8s.js'
import m8sController from '../controllers/m8s.js'
import secureRoute from '../middleware/secureRoute.js'
// import commentController from '../controllers/comments'

const router = express.Router()

router.route('/pl8s')
  .get(pl8Controller.index)
  .post(pl8Controller.create)

router.route('/pl8s/search')
  .get(pl8Controller.search)

router.route('/pl8s/:id')
  .get(pl8Controller.show)
  .delete(pl8Controller.remove)
  .put(pl8Controller.edit)

router.route('/pl8s/:id/r8ings')
  .post(secureRoute, pl8Controller.newR8ing)

router.route('/pl8s/:pl8Id/r8ings/:r8ingId')
  .put(secureRoute, pl8Controller.editR8ing)

router.route('/become-a-m8')
  .post(m8sController.register)

router.route('/login')
  .post(m8sController.login)

router.route('/m8/:id')
  .get(m8sController.show)
  .put(secureRoute, m8sController.edit)

router.route('/m8s')
  .get(m8sController.index)

export default router
