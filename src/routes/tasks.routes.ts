import * as Router from 'koa-router'
import { userAuth } from '../middleware'

import {
	addTask,
	changeTask,
	changeTasksStatus,
	deleteAllCompleted,
	deleteTask,
	getTasks,
} from '../middleware/tasks'

const router = new Router()

router.get('/tasks', userAuth, getTasks)

router.post('/create-task', userAuth, addTask)

router.delete('/task/:id', userAuth, deleteTask)

router.delete('/tasks/:ids', userAuth, deleteAllCompleted)

router.put('/task/update', userAuth, changeTask)

router.put('/task/change-status', userAuth, changeTasksStatus)

export default router.routes()
