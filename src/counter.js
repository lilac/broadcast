/**
 * Created by junjun.deng on 17/1/2018.
 */
const redis = require('./redis')

const key = 'count'

async function get() {
  let count = await redis.get(key)
  console.log(count)
}

function incr () {
  redis.incr(key).then(get)
}

function decr () {
  redis.decr(key).then(get)
}

module.exports = {
  get,
  incr,
  decr
}
