const MySerialPort = require("./MySerialPort");
const MySocket = require("./MySocket");
const DataProccesor = require("./dataProccesor");

class App {
  constructor() {
    this.serialPort = new MySerialPort("/dev/ttyACM0", 115200);
    this.mySocket = new MySocket("http://192.168.10.20:3100");
    this.dataProccesor = new DataProccesor();
    console.log("creado");
    this.samples = 0;
    this.prober = 0;
    this.serialPortOpen = false;
  }
  

  run() {
    this.mySocket.socket.on("connect", () => {
      console.log("Conexión establecida con el servidor");
    });

    this.serialPort.parser.on("data", (data) => {
      console.log(data);
      this.samples++;
      const processedData = this.dataProccesor.processData(data, this.samples);
      this.mySocket.socket.emit("rasberry:data", processedData);
      this.samples = 0;
    });

    this.mySocket.socket.on("btninit", (state) => {
      if (state === 0) {
        this.serialPort.port.write("D");
      } else if (state === 1) {
        this.serialPort.port.write("T");
      }
    });
  }
}

const myApp = new App();
myApp.run();
