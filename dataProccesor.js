class dataProccesor {
  processData(data, samples) {
    const splitter = data.split(" ");
    return {
      sample: samples,
      date: this.getDate("/"),
      time: this.getTime(),
      temperature: splitter[1],
      bpm: splitter[2],
      oxigenSaturation: splitter[3],
      grsVoltage: splitter[4],
      airflux: splitter[5],
      ECG: splitter[6],
    };
    
  }
  getTime() {
    var d = new Date();
    const date = d.getHours() + ":" + d.getMinutes();
    return date;
  }

  getDate(delimiter) {
    var d = new Date();
    const date =
      d.getDay() + delimiter + d.getMonth() + delimiter + d.getFullYear();
    return date;
  }
}

module.exports = dataProccesor;
