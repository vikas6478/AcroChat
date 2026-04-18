const express=require("express");
const app=express();
const http=require("http");
const cors=require("cors");
const {Server}=require("socket.io");

app.use(cors());

const server =http.createServer(app);


const io=new Server(server,{
    cors:{
        origin:'*',
        methods:['GET','POST']
    }
})

io.on("connection",(socket)=>{
    console.log(`connection final ID:${socket.id}`)
    socket.on("send_message",(data)=>{
        console.log(data)
        socket.broadcast.emit('receive_message',data)
    })
})


server.listen(8000,()=>{
    console.log("server run on 8000 port");
})