const {Domains} = require("../db/models/domains");

module.exports = async (ctx, next) => {
  try {
    const result = await Domains.findAll({
      limit: 20,
      order: [['id', 'DESC']]
    });

    ctx.response.body = result.map(item => ({
      addresses: JSON.parse(item.addresses),
      domain: item.domain,
      client_ip: item.client_ip,
      created_at: new Date(item.created_at).getTime()
    }))
  } catch (err) {
    console.error(err)

    ctx.response.body = {
      message: 'server error'
    }
  }
}
