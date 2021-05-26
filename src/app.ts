import * as dotenv from 'dotenv'
dotenv.config({ path: __dirname + '/.env' })

import * as Koa from 'koa'
import { DefaultState, DefaultContext } from 'koa'
import * as bodyParser from 'koa-body'
import * as cors from 'koa-cors'
import { JOIN_ROOM, REFRESH, TASKS_UPDATED } from './constants'

import mongooseConfig from './lib/mongoose-config'
import router from './routes'
import { verify } from './utils/verify'

const app: Koa<DefaultState, DefaultContext> = new Koa()

app.use(cors())

app.use(
	bodyParser({
		formidable: { uploadDir: './uploads' },
		multipart: true,
		urlencoded: true,
	})
)
app.use(router.allowedMethods())
app.use(router.routes())

mongooseConfig()

const httpServer = require('http').createServer(app.callback())

const io = require('socket.io')(httpServer, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST'],
	},
})

httpServer.listen(8000)

io.on('connection', socket => {
	socket.on(JOIN_ROOM, token => {
		const userId = verify(token)
		if (!userId) {
			socket.emit('REFRESH')
			return
		}
		socket.join(userId)
	})

	socket.on(TASKS_UPDATED, token => {
		const userId = verify(token)
		if (!userId) {
			socket.emit(REFRESH)
			return
		}
		socket.to(userId).emit(TASKS_UPDATED)
	})
})
