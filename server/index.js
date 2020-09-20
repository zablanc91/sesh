const app = require('express')();
const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`Server connected to port ${port}`));

const io = require('socket.io').listen(server);
let users = [];
let messages = [{
    user: 'Morpheus',
    message:'Welcome to the Matrix.'
    }, {
    user: 'Jim Kazama',
    message:"I'm here now."
}];

io.on('connection', socket => {
    socket.on('login', data => {
        users.push(data);
        //keep track of this socket's user to remove later on exit
        socket.user = data;
        console.log(`${socket.user} has logged in`);
        socket.emit('loadUsers', {users});
        socket.emit('loadMessages', {messages});
    });

    socket.on('sendMessage', data => {
        messages.push(data);
        socket.emit('loadMessages', {messages});
    })

    //need to figure out, not working at the moment
    socket.on('disconnect', () => {
        console.log(`${socket.user} has logged out`);
        users = users.filter(user => user != socket.user);
        socket.disconnect(0);
    });

});