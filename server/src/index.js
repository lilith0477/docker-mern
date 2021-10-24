const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');
const { connectSocketWithSession } = require('./middlewares/session');
const ioEventTransciever = require('./socket');

let server;
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info('Connected to MongoDB');
  server = app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
  });
  let io = require('socket.io')(server, {cors: true, origins: '*'})
  
  io.use(connectSocketWithSession)
  io.on('connection', function(socket) {
    const session = socket.request.session;
    session.connections++;
    session.socketio = socket.id;
    session.save();

    ioEventTransciever(socket, io)

  });
  app.set('ioClient', io) 

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
