import type { IncomingMessage, ServerResponse } from "node:http"
import { readProduct } from "../service/products.service"
import type { ProductsInfo } from "../types/products.types"

export const productsController =(req:IncomingMessage,res:ServerResponse)=>{
        const url =req.url
const method= req.method


// row users :
/*const users =[
    {
    id: 1,
    name:"products-1",
},{
    id: 2,
    name:"products-2",
}
]
*/

// ** getting product by id :: 

// will part the url and take the id 
const urlParts =url?.split('/')
const id = urlParts && urlParts[1] === "products" ? Number(urlParts[2]) : null
// console.log("the id is = ",id)

if (url==="/products" && method==="GET"){
 const products =readProduct ()
    res.writeHead(200 ,{ "content-type" :" application/json"})
   res.end(JSON.stringify({massage: "products" , data:{products}} ))
} else if (method === "GET" && id !== null){
     const products =readProduct ()
    const product = products.find((p:ProductsInfo)=>p.id===id)
      res.writeHead(200 ,{ "content-type" :" application/json"})
   res.end(JSON.stringify({massage: `product no - ${id}` , data:{product}} ))
}
}