const {SerialPort} =require('serialport');
const {ReadlineParser } = require('@serialport/parser-readline')
const io = require('socket.io-client');
var socket = io.connect('http://192.168.10.20:3000');

//socket establishment
socket.on('connect',()=>{
    console.log("Coneccion establecida con el servidor");
})


//data read
console.log("Importado");

const port = new SerialPort(
    {path:'/dev/ttyACM0',
    baudRate:115200
});

const parser = port.pipe(new ReadlineParser("\n"));

parser.on('open',()=>{
    console.log("coneccion abierta");
});

parser.on('data',(data)=>{
    console.log(data);
})




