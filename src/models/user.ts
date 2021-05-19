import * as mongoose from 'mongoose'
const Schema = mongoose.Schema
import * as privatePath from 'mongoose-private-paths'
import { UserType } from '../types'

const userSchema = new Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	createdDate: { type: Date, default: Date.now },
})

userSchema.plugin(privatePath)

const Users = mongoose.model<UserType>('users', userSchema)

export default Users
