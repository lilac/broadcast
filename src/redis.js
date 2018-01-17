/**
 * Created by junjun.deng on 17/1/2018.
 */
const Redis = require('ioredis')
const config = require('config')

const db = new Redis(config.redis)

module.exports = db
