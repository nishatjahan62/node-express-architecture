import type { IncomingMessage, ServerResponse } from "node:http"

export const productsController =(req:IncomingMessage,res:ServerResponse)=>{
        const url =req.url
const method= req.method

// row users :
const users =[
    {
    id: 1,
    name:"products-1",
},{
    id: 2,
    name:"products-2",
}
]


if (url==="/products" && method==="GET"){
    res.writeHead(200 ,{ "content-type" :" application/json"})
   res.end(JSON.stringify({massage: "products" , data:{users}} ))
}
}