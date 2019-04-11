const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors')

const app = express();
app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
    socket.on('connectRoom', box => {
        socket.join(box);
    });
});

mongoose.connect('mongodb+srv://guilherme_tecnologia:guilherme_tecnologia@cluster0-lc8dr.mongodb.net/rocketbox?retryWrites=true', {
    useNewUrlParser: true
});

// CONFIGURANDO MIDDLEWARE COM 'IO' GLOBAL
app.use((req, res, next) => {
    req.io = io;
    next();
})


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));
app.use(require('./routes'));

server.listen(process.env.PORT || 3000, () => {
    console.log('Servidor iniciado !');
});