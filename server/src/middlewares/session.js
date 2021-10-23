const config = require("../config/config");
const expsession = require('express-session');

const sessionMiddleware = expsession({
    secret: config.session.secret,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: true, httpOnly: true, maxAge: 1440000, signed: true }
});

function connectSocketWithSession (socket, next) {
    sessionMiddleware(socket.request, socket.request.res || {}, next);
}

// demo an increasing, per-client value in the session
function sessionCounter (req, res, next) {
    // req.session
    const session = req.session;
    if (!session.cntr) session.cntr = 0;
    ++session.cntr;
    next();
}



module.exports = {connectSocketWithSession, sessionMiddleware, sessionCounter}