const dns = require("dns");
const {Domains} = require("../db/models/domains");

// 查询dns方法
function dnsLook(domain) {
  return new Promise((resolve, reject) => {
    dns.lookup(domain, {all: true}, function (err, address) {
      if (err) {
        reject(err)
      }

      resolve(address)
    })
  })
}

module.exports = async (ctx, next) => {
  // 先获取请求参数
  const params = ctx.request.query;

  // 参数校验
  if (!params.domain) {
    ctx.response.body = {
      message: "params error!"
    }
    return
  }

  const {domain} = params;
  const {ip} = ctx.request;

  try {
    const result = await dnsLook(domain);

    // 获取 domain 的 dns 地址列表
    const addresses = [];
    result.forEach(item => {
      if (item.family === 4) addresses.push({ip: item.address})
    })

    // 插入数据
    const domains = await Domains.create({
      addresses: JSON.stringify(addresses),
      domain,
      client_ip: ip,
    })

    // 返回结果
    ctx.response.body = {
      addresses,
      domain,
      created_at: new Date(domains.created_at).getTime(),
      client_ip: ip
    }
  } catch (err) {
    console.error(err)

    ctx.response.body = {
      message: 'server error'
    }
  }
}
