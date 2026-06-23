import type { IncomingMessage, ServerResponse } from "http";
import { productsController } from "../controller/products.controller";
import { userController } from "../controller/users.controller";

export const routeHandler = (req: IncomingMessage, res: ServerResponse) => {
  // console.log(req.url); // '/', '/user', '/products'
  // console.log(req.method); // "GET" , "POST" , "Delete"

  const url = req.url;
  const method = req.method;

  if (url === "/" && method === "GET") {
    // console.log("This is Root route");
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "This is root route" }));
  } else if (url?.startsWith("/products")) {
    productsController(req, res);
  } else if (url?.startsWith("/users")) {
    userController(req, res); 
  } else {
    res.writeHead(404, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found!" }));
  }
};