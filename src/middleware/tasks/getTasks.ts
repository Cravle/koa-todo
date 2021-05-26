import Tasks from '../../models/tasks'

const getTasks = async ctx => {
	const status = ctx.request.query.status
	const tasks = status
		? await Tasks.find({ status, user: ctx.request.user.userId })
		: await Tasks.find({ user: ctx.request.user.userId })
	const count = {
		active: await Tasks.count({ status: 'active', user: ctx.request.user.userId }),
		completed: await Tasks.count({ status: 'completed', user: ctx.request.user.userId }),
	}

	ctx.body = {
		tasks,
		count,
	}
	ctx.status = 200
}

export default getTasks
