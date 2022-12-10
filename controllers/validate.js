module.exports = async (ctx, next) => {
  const params = ctx.request.body;
  const {ip} = params;

  if (!ip) {
    ctx.response.body = {
      message: 'params not found'
    }
    return
  }

  const reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/

  ctx.response.body = {
    status: reg.test(ip),
  }
}
