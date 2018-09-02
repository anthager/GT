import { Router } from 'express'
import { register, login } from './controllers/auth/auth'
import { validateRegisterInput, validateLoginInput } from './middleware/validateRequest'

export const router = Router()

router.post('/auth/register', ...validateRegisterInput, register)
router.post('/auth/login', ...validateLoginInput, login)
router.route('/').get((req, res) => res.json('working mate'))
