import { Router, Request, Response } from 'express'
import * as auth from './auth'
import * as restricted from './restricted'
import { validateToken } from '../middleware/validateToken'
export const router = Router()

router.use('/auth', auth.router)
router.use('/restricted', validateToken, restricted.router)
router.route('/').get((req, res) => res.json('working'))
