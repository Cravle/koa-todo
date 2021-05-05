import Tasks from '../../models/tasks'

const getTasks = async ctx => {
	const tasks = await Tasks.find({})

	ctx.body = {
		tasks,
	}
	ctx.status = 200
}

export default getTasks
