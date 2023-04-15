const io = require('socket.io-client');

class MySocket{
    constructor(url){
        this.socket = io.connect(url);
        
        this.socket.on('disconnect',()=>{
            console.log("coneccion finalizada")
        });
        this.socket.on('btninit',(state)=>{
            this.getState(state)
        })
    }
    getState(state){
        return state;
    }
}

module.exports = MySocket;