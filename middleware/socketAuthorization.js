const cookieParser = require('cookie-parser');
const passportSocketIo=require('passport.socketio');
const redisStore = require('../helpers/redisStore');

function onAuthorizeSuccess(data,accept) {
    accept(null,true);
  
}
function onAuthorizeFail(data,message,error,accept) {
    if(error)
        throw new Error(message);
        accept(null,false);
}
module.exports = passportSocketIo.authorize({
    cookieParser:cookieParser,
    key:'connect.sid',
    secret:process.env.SESSION_SECRET_KEY,
    store: redisStore,
    success: onAuthorizeSuccess,
    fail: onAuthorizeFail
})