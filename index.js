const Koa = require("koa");
const c2k = require("koa-connect");
const promBundle = require("express-prom-bundle");
const bodyParser = require("koa-bodyparser");
const cors = require("koa2-cors");
const logger = require("koa-logger");
const router = require("./routes");

const app = new Koa()
const metricsMiddleware = promBundle({includeMethod: true});

// 数据库表的初始化
require('./db/models/domains')

// 中间件加载
app
  .use(c2k(metricsMiddleware))
  .use(cors())
  .use(logger())
  .use(bodyParser())
  .use(router.routes()); // 挂载接口

app.listen(3000, () => {
  console.log('[f2pool] start-quick is starting at port 3000')
})
