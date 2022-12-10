const Router = require('koa-router')
const router = new Router();
const controllers = require('../controllers');
const config = require('../config');
const health = require('@cloudnative/health');
const { HealthEndpoint } = require('@restorecommerce/koa-health-check');

const healthcheck = new health.HealthChecker();

router.get('/', async (ctx, next) => {
  ctx.response.body = {
    version: config.version,
    date: parseInt(new Date().getTime() / 1000),
    kubernetes: !!process.env.KUBERNETES_SERVICE_HOST
  }
})
router.all('/health', HealthEndpoint(healthcheck));
router.get('/v1/history', controllers.history);
router.get('/v1/tools/lookup', controllers.lookup);
router.post('/v1/tools/validate', controllers.validate);

module.exports = router;
