import * as Koa from 'koa'
import { DefaultState, DefaultContext } from 'koa'
import * as mongoose from 'mongoose'
const bodyParser = require('koa-body')
import 'colors'
import { config } from './config'

import taskRoute from './routes/tasks.routes'

const PORT = config.port

const app: Koa<DefaultState, DefaultContext> = new Koa()
app.use(
	bodyParser({
		formidable: { uploadDir: './uploads' },
		multipart: true,
		urlencoded: true,
	})
)

const db = mongoose.connection
const host = config.mongoUri
const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false,
}

void (async () => {
	try {
		await mongoose.connect(host, options)
	} catch (e) {
		console.log(e)
	}
})()
db.on('error', err => console.log('Error, DB not connected'.red.bold, err))
db.on('connected', () => console.log('DB connected to mog'.green.bold))
db.on('disconnected', () => console.log('Mongo is disconnected'))
db.on('open', () => console.log('Connection Made!'))

app.use(taskRoute.routes())
app.use(taskRoute.allowedMethods())

app
	.listen(PORT, async () => {
		console.log(`Server listening on port: ${PORT}`)
	})
	.on('listening', () =>
		console.log(
			`server started on port=${PORT} got to http://localhost:${PORT}`.blue.bold
		)
	)
