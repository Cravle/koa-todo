import Tasks from '../models/tasks'

export const getTasks = async ctx => {
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
}

export const addTask = async ctx => {
	try {
		await Tasks.insertMany([
			{ text: ctx.request.body.text, status: ctx.request.body.status },
		])
		return (ctx.status = 200)
	} catch (e) {
		return (ctx.status = 400), ctx.body({ message: e.message })
	}
}

export const deleteTask = async ctx => {
	try {
		const id = ctx.params.id

		const task = await Tasks.findById(id)
		if (!task) {
			throw new Error('task not found')
		}

		await task.deleteOne()
		ctx.status = 200
		ctx.body = { message: 'task was removed' }
		return ctx
	} catch (e) {
		return (ctx.status = 404), (ctx.body = { message: 'task not found' })
	}
}

export const changeTask = async ctx => {
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
			task: task,
		}

		return ctx
	} catch (e) {
		return (ctx.status = 400), (ctx.body = { message: 'task not found' })
	}
}
