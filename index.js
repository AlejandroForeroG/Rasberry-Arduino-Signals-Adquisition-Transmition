const {SerialPort} =require('serialport');
const {ReadlineParser } = require('@serialport/parser-readline')
const io = require('socket.io-client')

//const socket = io("http://192.168.10.20")
//const ioo = require('socket.io');


console.log("Importado");

const port = new SerialPort(
    {path:'/dev/ttyACM0',
    baudRate:115200
});

const parser = port.pipe(new ReadlineParser("\n"));

//socket establishment
const socket = io.connect('http://192.168.10.20:3000');


socket.on('connect',()=>{
    console.log("Coneccion establecida con el servidor");

    parser.on('open', () => {
        console.log("coneccion abierta");
    });

    parser.on('data', (data) => {
        socket.emit('rasberry:data', {
            value: data.toString()
        });
        console.log(data);
    })

    socket.on("disconnect",()=>{
        console.log("desconeccion del servidor");
    })


})


//data read






