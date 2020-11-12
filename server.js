const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html',require('ejs').renderFile);

app.use('/',(req,res)=>{
    res.render('index.html');
})

//conexao do web socket WSL

let messages = [];

io.on('connection',(socket)=>{
    console.log('socket conectado em', socket.id);
    socket.on('sendMessage',(data)=>{
        messages.push(data);
        socket.broadcast.emit('receivedMessage',data);
    })
})


server.listen(3000,()=>{console.log('active on 3000')});