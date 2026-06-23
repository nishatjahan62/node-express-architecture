import { createServer, IncomingMessage, Server, ServerResponse } from "node:http";

const server : Server = createServer(
    (req:IncomingMessage,res:ServerResponse)=>{
    //    console.log(req.url);
    //     console.log(req.method);

    
const url =req.url
const method= req.method

if ( url ==="/" && method==="GET") {
    // res.writeHead(200 ,{ "content-type" :" text/plain"})
    res.writeHead(200 ,{ "content-type" :" application/json"})
    // res.end({massage: `Node Server is running on port ${PORT}`}) // server will crash .. have to send with stringify
    res.end(JSON.stringify({massage: `Node Server is running on port ${PORT}`}))

} else if (url==="/users" && method==="GET"){
    res.writeHead(200 ,{ "content-type" :" application/json"})
   res.end(JSON.stringify({massage: "this is User Route"}))
} else 
    // res.writeHead(404 ,{ "content-type" :" text/plain"})
res.writeHead(404 ,{ "content-type" :" application/json"})
       res.end(JSON.stringify({massage:"Route not found"}))

    }
)

const PORT =5000

server.listen(5000,()=>{
    console.log(`Server is running on the port ${PORT}`)
})

