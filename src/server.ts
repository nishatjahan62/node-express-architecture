import { createServer, IncomingMessage, Server } from "node:http";

const server : Server = createServer(
    (req:IncomingMessage,res)=>{
        console.log(req)
    }
)

const PORT =5000

server.listen(5000,()=>{
    console.log(`Server is running on the port ${PORT}`)
})