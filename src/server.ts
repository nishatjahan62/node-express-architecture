import { createServer, IncomingMessage, Server, ServerResponse } from "node:http";
import { routeHandler } from "./routes/routes";

const server : Server = createServer(
    (req:IncomingMessage,res:ServerResponse)=>{
    //    console.log(req.url);
    //     console.log(req.method);
routeHandler(req,res)
    }
)

const PORT =5000

server.listen(5000,()=>{
    console.log(`Server is running on the port ${PORT}`)
})

