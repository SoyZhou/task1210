const {Model, DataTypes} = require('sequelize');
const {sequelize} = require('../index');

class Domains extends Model {}

Domains.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  domain: {
    type: DataTypes.STRING(256),
    allowNull: false
  },
  addresses: {
    type: DataTypes.JSON,
    allowNull: false
  },
  client_ip: {
    type: DataTypes.STRING(64),
    allowNull: false
  },
}, {
  sequelize,
  tableName: 'domains'
})

module.exports = {Domains}
