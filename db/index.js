const Sequelize = require('sequelize')
const {database} = require('../config')

const sequelize = new Sequelize(
  database.db,
  database.username,
  database.password,
  {
    dialect: 'mysql',
    host: database.host,
    port: database.port,
    logging: true,
    timezone: '+08:00',
    define: {
      // create_time && update_time
      timestamps: true,
      // delete_time
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      // 把驼峰命名转换为下划线
      underscored: true,
      freezeTableName: true,
      scopes: {
        bh: {
          attributes: {
            exclude: ['updated_at', 'deleted_at', 'created_at']
          }
        }
      }
    }
  })

// 创建模型
sequelize.sync({
  force: false
})

module.exports = {sequelize}
