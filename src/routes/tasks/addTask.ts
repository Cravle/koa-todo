import Tasks from '../../models/tasks'

const addTask = async ctx => {
	try {
		await Tasks.insertMany([
			{ text: ctx.request.body.text, status: ctx.request.body.status },
		])
		ctx.status = 201
	} catch (e) {
		ctx.throw(400)
	}
}

export default addTask
