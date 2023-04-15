const MySerialPort = require('./MySerialPort');
const MySocket = require('./MySocket');
const DataProccesor =  require('./dataProccesor');

class App{
    constructor(){
        this.serialPort = new MySerialPort('/dev/ttyACM0', 115200);
        this.mySocket = new MySocket('http://192.168.10.15:3000')
        this.dataProccesor = new DataProccesor();

        this.samples=0;
        this.prober=0;
    }

    run(){
        this.mySocket.socket.on('connect',()=>{
            console.log("Conexión establecida con el servidor");
            
            this.serialPort.parser.on('data',(data)=>{
                console.log(this.samples)
                if(this.prober==1){
                    this.samples++
                    const processedData=this.dataProccesor.processData(data,this.samples)
                    this.mySocket.socket.emit('rasberry:data',processedData);
                }else{
                    this.samples = 0;
                }
            })
            this.mySocket.socket.on('btninit',(state)=>{
                this.prober=state;
            })
        });
    }


}
    
const myApp = new App();
myApp.run()