module.exports.listen = function(app){
	var io = require('socket.io').listen(app);
	io.sockets.on('connection',function(socket){
		socket.on("message",function(message){
			io.sockets.socket(message.sid).send(message.command)
		});
	});
}