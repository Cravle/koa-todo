import * as jwt from 'jsonwebtoken'
import config from '../lib/config'

const userAuth = async (ctx, next) => {
	try {
		const token = ctx.request.headers.authorization.split(' ')[1]
		if (!token) {
			ctx.status = 404
			ctx.body = {
				message: 'Not authorized',
			}
			return
		}

		const decoded = jwt.verify(token, config.secret)

		ctx.request.user = decoded

		await next()
		return
	} catch (e) {
		ctx.status = 401
		ctx.body = {
			message: 'Expired token',
		}
	}
}

export default userAuth
