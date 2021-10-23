const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');
const { connectSocketWithSession } = require('./middlewares/session');

let server;
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info('Connected to MongoDB');
  server = app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
  });
  let io = require('socket.io')(server, {cors: true, origins: '*'})
  app.set('ioClient', io) 
  io.use(connectSocketWithSession)
  // when a socket.io connect connects, get the session and store the id in it
  io.on('connection', function(socket) {
    // socket.handshake.headers
    console.log(`socket.io connected: ${socket.id}`);
    // save socket.io socket in the session
    // console.log("session at socket.io connection:n", socket.request.session);
    socket.request.session.socketio = socket.id;
    socket.request.session.save();

    socket.on('join', (data) => {
      console.log(data)
      io.emit('joinNotif', `Welcome New user: ${data}`)
    })
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
