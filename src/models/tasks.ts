import * as mongoose from 'mongoose'
const Schema = mongoose.Schema

const tasksSchema = new Schema({
	text: { type: String, required: true },
	status: { type: String, required: true },
})

tasksSchema.set('toJSON', {
	virtuals: true,
})

const Tasks = mongoose.model('tasks', tasksSchema)

export default Tasks
