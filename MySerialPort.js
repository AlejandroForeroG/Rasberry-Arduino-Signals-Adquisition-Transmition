const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

class MySerialPort{
    constructor(path,baudRate){
        this.port = new SerialPort({
            path: path,
            baudRate: baudRate
        });
        this.parser = this.port.pipe(new ReadlineParser("\n"));
        this.parser.on('open',()=>{
            console.log("coneccion abierta")
        });

    }
}

module.exports=MySerialPort;