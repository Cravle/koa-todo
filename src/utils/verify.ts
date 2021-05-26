import * as jwt from 'jsonwebtoken'
import config from '../lib/config'

export const verify = token => {
	try {
		const jwtToken = token.split(' ')[1]
		const user = jwt.verify(jwtToken, config.secret)
		return user ? user.userId : null
	} catch (e) {
		return
	}
}
