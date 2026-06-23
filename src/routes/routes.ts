import type { IncomingMessage, ServerResponse } from "http";
import { userController } from "../controller/users.controller";
import { productsController } from "../controller/products.controller";

const PORT =5000

export const routeHandler = (req:IncomingMessage,res:ServerResponse)=>{
    const url =req.url
const method= req.method

if ( url ==="/" && method==="GET") {
    // res.writeHead(200 ,{ "content-type" :" text/plain"})
    res.writeHead(200 ,{ "content-type" :" application/json"})
    // res.end({massage: `Node Server is running on port ${PORT}`}) // server will crash .. have to send with stringify
    res.end(JSON.stringify({massage: `Node Server is running on port ${PORT}`}))

} else if (url?.startsWith("/users") && method==="GET"){
 userController(req,res)
} else if (url?.startsWith("/products") && method === "GET") {
    productsController(req, res)
} 
else {
      // res.writeHead(404 ,{ "content-type" :" text/plain"})
res.writeHead(404 ,{ "content-type" :" application/json"})
       res.end(JSON.stringify({massage:"Route not found"}))
}
}