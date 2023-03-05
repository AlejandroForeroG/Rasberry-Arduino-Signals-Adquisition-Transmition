const {SerialPort} =require('serialport');

console.log("Importado");

const port = new SerialPort(
    {path:'/dev/ttyACM0',
    baudRate:115200
});
// const Readline = SerialPort.parsers.Readline();
// console.log(Readline)