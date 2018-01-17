/**
 * Created by junjun.deng on 17/1/2018.
 */
var io = require('socket.io')()
const config = require('config')
const redis = require('./redis')

async function getCount() {
  let count = await redis.get('count')
  console.log(count)
}

io.on('connection', (socket) => {
  // socket.on('message', function () { });
  redis.incr('count').then(getCount)
  socket.on('disconnect', () => {
    redis.decr('count').then(getCount)
  })
});

io.listen(config.ws.port);
