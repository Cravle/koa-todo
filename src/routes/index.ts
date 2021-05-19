import * as Router from 'koa-router'

import tasks from './tasks.routes'
import users from './users.routes'

export const router = new Router()

router.use(users)

router.use(tasks)

export default router
