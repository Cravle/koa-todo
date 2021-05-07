import Tasks from '../../models/tasks'

const getTasks = async ctx => {
	const status = ctx.request.query.status
	const tasks = status ? await Tasks.find({ status }) : await Tasks.find({})
	const count = {
		active: await Tasks.count({ status: 'active' }),
		completed: await Tasks.count({ status: 'completed' }),
	}

	ctx.body = {
		tasks,
		count,
	}
	ctx.status = 200
}

export default getTasks
