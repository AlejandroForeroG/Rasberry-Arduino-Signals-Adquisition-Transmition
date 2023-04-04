const {SerialPort} =require('serialport');
const {ReadlineParser } = require('@serialport/parser-readline')
const io = require('socket.io-client')
const { getTime,getDate} =  require('./time');
console.log("Importado");


const port = new SerialPort(
    {path:'/dev/ttyACM0',
    baudRate:115200
});
//socket establishment and serial port 
const parser = port.pipe(new ReadlineParser("\n"));
const socket = io.connect('http://192.168.10.20:3000');



var prober = 0;
var samples = 0;

//scoket events 
socket.on('connect',()=>{


        console.log("Coneccion establecida con el servidor");
        console.log("inicio de transmision")
        
        parser.on('open', () => {
            console.log("coneccion abierta");
        });

        parser.on('data', (data) => {
            if(prober==1){
            //processing data 
            samples++
            let splitter =data.split(" "); 
            console.log(splitter[0])
            socket.emit('rasberry:data', {
                sample:samples,
                date: getDate("/"),
                time: getTime(),
                temperature: splitter[1],
                bpm :splitter[2],
                oxigenSaturation:splitter[3],
                gsrResistance:splitter[4],
                grsVoltage:splitter[5],
                airflux: splitter[6]
            });
        }else{
            samples = 0;
        }
        })
    
    

    socket.on("disconnect",()=>{
        console.log("desconeccion del servidor");
    })


    socket.on('btninit',(state)=>{
      prober=state;
 
    })



})






