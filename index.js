const {SerialPort} =require('serialport');
const {ReadlineParser } = require('@serialport/parser-readline')
const io = require('socket.io-client')
const { getTime,getDate} =  require('./obj');


console.log("Importado");

const port = new SerialPort(
    {path:'/dev/ttyACM0',
    baudRate:115200
});

const parser = port.pipe(new ReadlineParser("\n"));

//socket establishment
const socket = io.connect('http://192.168.10.20:3000');

//scoket events 
socket.on('connect',()=>{
    console.log("Coneccion establecida con el servidor");

    parser.on('open', () => {
        console.log("coneccion abierta");
    });

    parser.on('data', (data) => {
        //processing data 
        let splitter =data.split(" ");

        //transmission 
        socket.emit('rasberry:data', {
            sampleGen:splitter[0],
            date: getDate("/"),
            time: getTime(),
            temperature: splitter[1],
            bmp:splitter[2],
            oxigenSaturation:splitter[3],
            gsrResistance:splitter[4],
            grsVoltage:splitter[5],
            airflux: splitter[6]
        });

    })

    socket.on("disconnect",()=>{
        console.log("desconeccion del servidor");
    })


})

//functions






