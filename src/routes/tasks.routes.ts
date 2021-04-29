import * as Router from 'koa-router'
import Tasks from '../models/tasks'
const router = new Router()

router.get('/tasks', ctx => {
	Tasks.find().then(tasks => {
		console.log(tasks)

		ctx.body = {
			tasks: tasks,
		}
		ctx.status = 200
	})
})

export default router
