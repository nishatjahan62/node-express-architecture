import type { IncomingMessage, ServerResponse } from "node:http";
import { readProduct, writeProduct } from "../service/products.service";
import type { ProductsInfo } from "../types/products.types";
import { parsedBody } from "../utility/parsedBody";

export const productsController = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url;
  const method = req.method;

  // console.log("Request" , req)
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
  const urlParts = url?.split("/");
  const id =
    urlParts && urlParts[1] === "products" ? Number(urlParts[2]) : null;
  // console.log("the id is = ",id)

  if (url === "/products" && method === "GET") {
    const products = readProduct();
    res.writeHead(200, { "content-type": " application/json" });
    res.end(JSON.stringify({ massage: "products", data: { products } }));
  } else if (method === "GET" && id !== null) {
    const products = readProduct();
    const product = products.find((p: ProductsInfo) => p.id === id);

    if(!product){
         res.writeHead(404, { "content-type": " application/json" });
       res.end(
         JSON.stringify({
           massage: "product not found",
           data: null
         }),
       );
    }
    res.writeHead(200, { "content-type": " application/json" });
    res.end(
      JSON.stringify({ massage: `product no - ${id}`, data: { product } }),
    );

  }
  // created product with post / push
  else if (method === "POST" && url === "/products") {
    const body = await parsedBody(req);
    const products = readProduct();
    // making dynamic id
    const newProduct = {
      id: Date.now(),
      ...body,
    };
    products.push(newProduct);
    writeProduct(products);
    res.writeHead(200, { "content-type": " application/json" });
    res.end(
      JSON.stringify({
        massage: "product created successfully",
        data: { newProduct },
      }),
    );
    //    console.log(body)
  } else if ((method === "PUT" || method === "PATCH") && id !== null) {
    const body = await parsedBody(req);
    const products = readProduct();

    const index = products.findIndex((p: ProductsInfo) => p.id === id);
    // console.log(index)
    if (index < 0) {
      res.writeHead(404, { "content-type": " application/json" });
      res.end(
        JSON.stringify({ massage: "The index is not found", data: null }),
      );
      return;
    }
// products[index] = { ...products[index], ...body }  --- patch behavior
    products[index] = { id: products[index].id, ...body };

    writeProduct(products);
    res.writeHead(200, { "content-type": " application/json" });
    res.end(
      JSON.stringify({
        massage: "product updated successfully",
        data: products[index],
      }),
    );
  }else if(method==="DELETE" && id !==null){
  const products = readProduct()
  
  const index = products.findIndex((u: ProductsInfo) => u.id === id);
   if(index<0){
     res.writeHead(404, { "content-type": " application/json" });
       res.end(
         JSON.stringify({
           massage: "index not found",
           data: null
         }),
       );
   }
  
       products.splice(index,1)
       writeProduct(products)
       res.writeHead(200, { "content-type": " application/json" });
       res.end(
         JSON.stringify({
           massage: "product Deleted successfully",
           data: products[index],
         }),
       );
     }
};
