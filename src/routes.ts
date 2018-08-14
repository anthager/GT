import { Router } from 'express'
import { register, login } from './controllers/auth/auth'
import { validateRegisterInput } from './middleware/validateRequest'

export const router = Router()

router.post('/auth/register', ...validateRegisterInput, register)
router.get('/auth/login', login)
router.route('/').get((req, res) => res.json('working mate'))
