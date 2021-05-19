import Tasks from '../../models/tasks'

const deleteTask = async ctx => {
	const id = ctx.params.id

	const task = await Tasks.findById(id)
	if (!task) {
		ctx.status = 400
		ctx.body = {
			message: 'task not found',
		}
	}

	await task.deleteOne()
	ctx.status = 200
	ctx.body = { message: 'task was removed' }
}

export default deleteTask
