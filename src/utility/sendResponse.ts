import type { ServerResponse } from "node:http";

export const sendResponse=(res:ServerResponse , statusCode :number, success:boolean , massage:string , data?:object)=>{
const response ={
   statusCode,
    success,
   massage,
   data
}
res.writeHead(statusCode, { "content-type": " application/json" });
     res.end(
       JSON.stringify((response)),
     );
}

