var express = require('express');
var app = module.exports = express.createServer();

// Configuration
var io = require('socket.io').listen(app);

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade'); 
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
});
app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});
var host;

// Routes
app.get('/', function(req,res){
	res.render('index');
});

app.get('/controller/:sid',function(req,res){
	res.render('controller',{sid:req.params.sid});
})

//Socket.io
io.sockets.on('connection',function(socket){
	socket.on("message",function(message){
		io.sockets.socket(message.sid).send(message.command)
	});
});
app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});


