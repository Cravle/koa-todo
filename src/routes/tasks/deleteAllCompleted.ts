import Tasks from '../../models/tasks'

const deleteAllCompleted = async ctx => {
	const ids = JSON.parse(ctx.params.ids)

	const tasks = Tasks.find({
		_id: { $in: ids },
	})

	if (!tasks) {
		ctx.throw(400, 'tasks not found')
	}

	await Tasks.deleteMany({
		_id: { $in: ids },
	})

	ctx.status = 200
	ctx.body = {
		message: `Completed tasks were deleted`,
	}
}

export default deleteAllCompleted
