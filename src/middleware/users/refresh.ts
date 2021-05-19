import * as jwt from 'jsonwebtoken'

import config from '../../lib/config'

const refresh = async ctx => {
	const token = jwt.sign(
		{
			userId: ctx.request.user.userId,
		},
		config.secret,
		{ expiresIn: config.tokenTime }
	)

	const refreshToken = jwt.sign(
		{
			userId: ctx.request.user.userId,
		},
		config.secret,
		{ expiresIn: config.refreshTime }
	)

	ctx.status = 201
	ctx.body = {
		token: `Bearer ${token}`,
		refreshToken: `Bearer ${refreshToken}`,
	}
}

export default refresh
