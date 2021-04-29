const Koa = require('koa')

const app = new Koa()

app.use(async ctx => (ctx.body = 'Hello world'))

app.listen(8000, () => console.log('Server started...'))
