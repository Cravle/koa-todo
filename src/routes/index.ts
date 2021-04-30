import * as Router from 'koa-router'
import { addTask, changeTask, deleteTask, getTasks } from './tasks.routes'
const router = new Router()

router.get('/tasks', getTasks)

router.post('/task/add', addTask)

router.delete('/task/:id', deleteTask)

router.put('/task/update', changeTask)

export default router
