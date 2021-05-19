import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'

import Users from '../../models/user'
import config from '../../lib/config'

const login = async ctx => {
	const { email, password } = ctx.request.body

	const candidate = await Users.findOne({ email })
	if (!candidate) {
		ctx.status = 403
		ctx.body = {
			message: 'Email or password is incorrect',
		}
		return
	}

	const passwordResult = bcrypt.compareSync(password, candidate.password)

	if (!passwordResult) {
		ctx.status = 403
		ctx.body = {
			message: 'Email or password is incorrect',
		}
		return
	}

	const refreshToken = jwt.sign(
		{
			userId: candidate._id,
		},
		config.secret,
		{ expiresIn: config.refreshTime }
	)

	const token = jwt.sign(
		{
			userId: candidate._id,
		},
		config.secret,
		{ expiresIn: config.tokenTime }
	)

	ctx.status = 200
	ctx.body = {
		token: `Bearer ${token}`,
		refreshToken: `Bearer ${refreshToken}`,
	}
}

export default login
