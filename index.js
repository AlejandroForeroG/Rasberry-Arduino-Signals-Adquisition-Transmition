const {SerialPort} =require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline')

console.log("Importado");

const port = new SerialPort(
    {path:'/dev/ttyACM0',
    baudRate:115200
});



port.on("open", () => {
    console.log('serial port open');
});
port.on('data', (data) => {
    console.log('got word from arduino:', data.toString());
});
