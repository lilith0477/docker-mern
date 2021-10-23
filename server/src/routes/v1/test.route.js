const express = require('express');
const app = require('../../app');

const router = express.Router();

router
  .route('/')
  .get(async (req, res) => {
    const session = req.session;
    const io = req.app.get('ioClient')
    const apiRef = {
        "Current Session"               : session,
        // "Main Info"                     : io.engine,
        "All"                           : io.fetchSockets(),
        // "App Wide Socket Count"     : io.engine.clientsCount,
        // "In Particular NameSpace"        : io.of("/").sockets,

    }
    console.log(
        "\n==============================================\n",
        await  io.fetchSockets(),
        "\n==============================================\n",
    )
    console.log("TODO: Item:", req.app.get('ioClient').engine.clientsCount)            

    res.json(apiRef );

  });
module.exports = router;


// router.get('/', (req, res) => {
//     const session = req.session;
//     // app.get('ioClient').sockets.connected[session.socketio].emit('show', cntr++);
//     res.json({greeting: "hello", session, });
//     // res.json({greeting: "hello", session, connected: io.sockets.connected});
//   })