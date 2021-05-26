import Tasks from '../../models/tasks'

const changeTask = async ctx => {
	const { id, text, status } = ctx.request.body
	const task = await Tasks.findById(id)
	if (!task) {
		ctx.status = 400
		ctx.body = {
			message: 'task not found',
		}
	}

	await Tasks.findOneAndUpdate(
		{ _id: id },
		{
			text: text,
			status: status,
		},
		{ new: true }
	)

	ctx.status = 200
	ctx.body = {
		task: task,
	}
}

export default changeTask
