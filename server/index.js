const app = require('express')();
const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`Server connected to port ${port}`));

const io = require('socket.io').listen(server);

io.on('connection', socket => {
    socket.emit('login', 'Welcome to the Matrix.');
});
