const app = require('express')();
const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`Server connected to port ${port}`));

const io = require('socket.io').listen(server);
let users = [];
let messages = ['Welcome to the Matrix.', "I'm here now."];

io.on('connection', socket => {
    socket.emit('connected', {users, messages} );

    socket.on('login', data => {
        users.push(data);
        console.log('user logged in:', users);
    });

    //need to figure out, not working at the moment
    socket.on('exit', username => {
        console.log('calling disconnect: ', username);
        users = users.filter(user => user != username);
        socket.disconnect(0);
    });

});