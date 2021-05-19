import * as Router from 'koa-router'
import { userAuth } from '../middleware'
import { login, register, refresh } from '../middleware/users'

const router = new Router()

router.post('/auth/register', register)

router.post('/auth/login', login)

router.post('/auth/refresh', userAuth, refresh)

export default router.routes()
