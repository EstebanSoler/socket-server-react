
//Servidor de Express
const express =  require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');

class Server {
  constructor() {
    this.app = express();;
    this.port = process.env.PORT;

    //http server
    this.server = http.createServer(this.app);

    //configuraciones de socket
    this.io = socketio(this.server, {/*configuraciones */});

  }

  middlewares() {
    //Desplegar el directorio publico
    this.app.use(express.static(path.resolve(__dirname, '../public' )));
  }

  configurarSocket() {
    new Sockets(this.io);
  }

  execute() {
    //Inicializar Middlewares
    this.middlewares();

    //Inicializar Socekt
    this.configurarSocket();
    
    //Inicializar Server
    this.server.listen(this.port, ()=> {
      console.log('Server corriendo en puerto: ', this.port);
    });
  }

}

module.exports = Server;