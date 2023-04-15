
class dataProccesor{

    processData(data,samples){
        const splitter = data.split(" ");
        return{
            sample: samples,
            date: this.getDate("/"),
            time: this.getTime(),
            temperature: splitter[1],
            bpm: splitter[2],
            oxigenSaturation: splitter[3],
            gsrResistance: splitter[4],
            grsVoltage: splitter[5],
            airflux: splitter[6],
            ECG: splitter[7]
        };

    }  
  getTime() {
    var d = new Date();
    const date = d.getHours() + ":" + (d.getMinutes())
    return date;
}

    getDate(delimiter) {
        var d = new Date();
        const date = d.getDay() + delimiter + d.getMonth() + delimiter + d.getFullYear();
        return date;
    }
}



module.exports = dataProccesor;