import * as dotenv from 'dotenv'
dotenv.config({ path: __dirname + '/.env' })

import * as Koa from 'koa'
import { DefaultState, DefaultContext } from 'koa'
import * as bodyParser from 'koa-body'
import * as cors from 'koa-cors'

import mongooseConfig from './lib/mongoose-config'
import config from './lib/config'
import router from './routes'

const port = config.port

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

app.listen(port, async () => {
	console.log(`Server listening on port: ${port}`)
})
