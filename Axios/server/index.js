const Koa = require("koa")
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const cors = require('koa-cors')

const app = new Koa()
const router = new Router()

app.use(bodyParser())
app.use(cors())

router.get('/', ctx => {
  ctx.status = 200
  ctx.body = {
    status: 'get success',
    query: ctx.query,
    req: ctx.request.body
  }
})

router.post('/', ctx => {
  ctx.status = 200
  ctx.body = {
    status: 'post success',
    query: ctx.query,
    req: ctx.request.body
  }
})

app.use(router.routes())
  .use(router.allowedMethods())

app.listen(3000, () => {
  console.log('listening on port 3000')
})