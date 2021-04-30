import * as Router from 'koa-router'
import Tasks from '../models/tasks'
const router = new Router()

router.get('/tasks', async ctx => {
	try {
		const tasks = await Tasks.find()
		ctx.body = {
			tasks: tasks,
		}
		ctx.status = 200

		return ctx
	} catch (e) {
		return (ctx.status = 400), ctx.body({ message: e.message })
	}
})

router.post('/task/add', async ctx => {
	try {
		await Tasks.insertMany([
			{ text: ctx.request.body.text, status: ctx.request.body.status },
		])
		return (ctx.status = 200)
	} catch (e) {
		return (ctx.status = 400), ctx.body({ message: e.message })
	}
})

router.delete('/task/:id', async ctx => {
	try {
		const id = ctx.params.id

		await Tasks.findOneAndDelete(
			{ _id: id },
			//@ts-ignore
			(err: Error) => {
				if (err) {
					throw err
				}
				return (ctx.status = 200), (ctx.body = { message: 'task was removed' })
			}
		)
	} catch (e) {
		return (ctx.status = 404), (ctx.body = { message: 'task not found' })
	}
})

router.put('/task/update', async ctx => {
	try {
		const { id, text, status } = ctx.request.body
		const task = await Tasks.findById(id)
		if (!task) {
			throw new Error('task not found')
		}

		await task.updateOne({
			text: text,
			status: status,
		})

		ctx.status = 200
		ctx.body = {
			message: 'task was update',
		}

		return ctx
	} catch (e) {
		return (ctx.status = 400), (ctx.body = { message: 'task not found' })
	}
})

export default router
