import type { IncomingMessage, ServerResponse } from "node:http";
import { readProduct, writeProduct } from "../service/products.service";
import type { ProductsInfo } from "../types/products.types";
import { parsedBody } from "../utility/parsedBody";
import { sendResponse } from "../utility/sendResponse";

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
    try {
        const products = readProduct();
        return sendResponse(res, 200, true, "All products retrieved successfully", products)
    } catch (error) {
        return sendResponse(res, 500, false, "Something went wrong")
    }

} else if (method === "GET" && id !== null) {
    try {
        const products = readProduct();
        const product = products.find((p: ProductsInfo) => p.id === id);
        if (!product) return sendResponse(res, 404, false, "Product not found")
        return sendResponse(res, 200, true, `Product no - ${id}`, product)
    } catch (error) {
        return sendResponse(res, 500, false, "Something went wrong")
    }

}
  // created product with post / push
else if (method === "POST" && url === "/products") {
    try {
        const body = await parsedBody(req);
        const products = readProduct();
        // making dynamic id
        const newProduct = { id: Date.now(), ...body };
        products.push(newProduct);
        writeProduct(products);
        return sendResponse(res, 201, true, "Product created successfully", newProduct)
    } catch (error) {
        return sendResponse(res, 500, false, "Something went wrong")
    }

} else if ((method === "PUT" || method === "PATCH") && id !== null) {
    try {
        const body = await parsedBody(req);
        const products = readProduct();
        const index = products.findIndex((p: ProductsInfo) => p.id === id);
        // console.log(index)
        if (index < 0) return sendResponse(res, 404, false, "Product not found")
        // products[index] = { ...products[index], ...body }  --- patch behavior
        products[index] = { id: products[index].id, ...body };
        writeProduct(products);
        return sendResponse(res, 200, true, "Product updated successfully", products[index])
    } catch (error) {
        return sendResponse(res, 500, false, "Something went wrong")
    }

} else if (method === "DELETE" && id !== null) {
    try {
        const products = readProduct();
        const index = products.findIndex((p: ProductsInfo) => p.id === id);
        if (index < 0) return sendResponse(res, 404, false, "Product not found")
        products.splice(index, 1);
        writeProduct(products);
        return sendResponse(res, 200, true, "Product deleted successfully")
    } catch (error) {
        return sendResponse(res, 500, false, "Something went wrong")
    }
}}