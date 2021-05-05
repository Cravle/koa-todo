import Tasks from '../../models/tasks'

const changeTask = async ctx => {
	const { id, text, status } = ctx.request.body
	const task = await Tasks.findById(id)
	if (!task) {
		ctx.throw(400, 'task not found')
	}

	await task.updateOne({
		text: text,
		status: status,
	})

	ctx.status = 200
	ctx.body = {
		task: task,
	}
}

export default changeTask
