import express from 'express'
import userCtrl from '../controllers/user.controller.js'
import authCtrl from '../controllers/auth.controller.js'

const router = express.Router()

// 1. Base route: POST /api/users, GET /api/users
router.route('/')
  .post(userCtrl.create)
  .get(userCtrl.list)

// 2. Special route for removing all users (mounted under /api/users/all)
router.route('/all')
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.removeAll)

// 3. Parameter handler
router.param('userId', userCtrl.userByID)

// 4. Routes for specific user
router.route('/:userId')
  .get(authCtrl.requireSignin, userCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove)

export default router
