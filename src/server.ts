import { createServer, IncomingMessage, Server, ServerResponse } from "node:http";
import { routeHandler } from "./routes/routes";
import config from "./config/config";

const server : Server = createServer(
    (req:IncomingMessage,res:ServerResponse)=>{
    //    console.log(req.url);
    //     console.log(req.method);
routeHandler(req,res)
    }
)

const PORT = config.port || 5000

server.listen(PORT,()=>{
    console.log(`Server is running on the port ${PORT}`)
})

