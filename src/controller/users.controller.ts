import type { IncomingMessage, ServerResponse } from "node:http"

export const userController =(req:IncomingMessage,res:ServerResponse)=>{
        const url =req.url
const method= req.method

// row users :
const users =[
    {
    id: 1,
    name:"user-1",
},{
    id: 2,
    name:"user-2",
}
]


if (url==="/users" && method==="GET"){
    res.writeHead(200 ,{ "content-type" :" application/json"})
   res.end(JSON.stringify({massage: "Users" , data:{users}} ))
}
}