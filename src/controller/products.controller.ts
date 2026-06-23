import type { IncomingMessage, ServerResponse } from "node:http"
import { readProduct } from "../service/products.service"

export const productsController =(req:IncomingMessage,res:ServerResponse)=>{
        const url =req.url
const method= req.method
/*
// row users :
const users =[
    {
    id: 1,
    name:"products-1",
},{
    id: 2,
    name:"products-2",
}
] */
const products =readProduct ()

    res.writeHead(200 ,{ "content-type" :" application/json"})
   res.end(JSON.stringify({massage: "products" , data:{products}} ))
}