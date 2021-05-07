import * as Router from 'koa-router'

import {
	addTask,
	changeTask,
	changeTasksStatus,
	deleteAllCompleted,
	deleteTask,
	getTasks,
} from './tasks'

const router = new Router()

router.get('/tasks', getTasks)

router.post('/create-task', addTask)

router.delete('/task/:id', deleteTask)

router.delete('/tasks/:ids', deleteAllCompleted)

router.put('/task/update', changeTask)

router.put('/task/change-status', changeTasksStatus)

export default router.routes()
