import * as Router from 'koa-router'

import tasks from './tasks.routes'

export const router = new Router()

router.use(tasks)

export default router
