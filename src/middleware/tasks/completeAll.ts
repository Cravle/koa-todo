import Tasks from '../../models/tasks'

const changeTasksStatus = async ctx => {
	const { ids, status } = ctx.request.body

	const tasks = Tasks.find({
		_id: { $in: ids },
	})

	if (!tasks) {
		ctx.status = 400
		ctx.body = {
			message: 'tasks not found',
		}
	}

	await Tasks.updateMany(
		{
			_id: { $in: ids },
		},
		{ status }
	)

	ctx.status = 200
	ctx.body = {
		message: `Tasks was update`,
	}
}

export default changeTasksStatus
