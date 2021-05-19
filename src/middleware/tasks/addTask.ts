import Tasks from '../../models/tasks'

const addTask = async ctx => {
	try {
		await Tasks.insertMany([
			{
				text: ctx.request.body.text,
				status: ctx.request.body.status,
				user: ctx.request.user.userId,
			},
		])
		ctx.status = 201
	} catch (e) {
		ctx.status = 400
		ctx.body = {
			message: 'something went wrong',
		}
	}
}

export default addTask
