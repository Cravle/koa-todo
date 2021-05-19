import * as mongoose from 'mongoose'

export type User = {
	email: string
	password: string
	createdDate: Date
}

export type UserType = User & mongoose.Document
