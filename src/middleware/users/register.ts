import * as bcrypt from 'bcryptjs'

import Users from '../../models/user'
import { isEmail, isPassword } from '../../utils/validators'

const register = async ctx => {
	const { email, password } = ctx.request.body

	const validateEmail = isEmail(email)

	if (!validateEmail) {
		ctx.status = 420
		ctx.body = {
			message: 'Email is incorrect',
		}
		return
	}

	const validatePassword = isPassword(password)

	if (!validatePassword) {
		ctx.status = 420
		ctx.body = {
			message: 'Minimum eight characters, at least one letter and one number',
		}
		return
	}

	const candidate = await Users.findOne({ email })
	if (candidate) {
		ctx.status = 409
		ctx.body = {
			message: 'User with this email already exist',
		}
		return
	}

	const salt = bcrypt.genSaltSync(8)

	await Users.insertMany([{ email, password: bcrypt.hashSync(password, salt) }])

	ctx.body = {
		message: 'User created',
	}
	ctx.status = 201
}

export default register
