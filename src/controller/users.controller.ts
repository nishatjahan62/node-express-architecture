import type { IncomingMessage, ServerResponse } from "node:http"
import { readUsers, writeUsers } from "../service/users.service"
import type { UsersInfo } from "../types/users.types"
import { parsedBody } from "../utility/parsedBody"


export const userController =async (req:IncomingMessage,res:ServerResponse)=>{
        const url =req.url
const method= req.method

/* // row users :
const users =[
    {
    id: 1,
    name:"user-1",
},{
    id: 2,
    name:"user-2",
}
]*/

// single user  by id:

const pathParts = url?.split("/")
const id = pathParts && pathParts[1] === "users" ? Number(pathParts[2]) : null

if (method==="GET" && url ==="/users") {
    const users = readUsers()
    res.writeHead(200 ,{ "content-type" :" application/json"})
   res.end(JSON.stringify({massage: "Users" , data:{users}} ))
} else if (id !== null && method ==="GET") {
const users =readUsers()
const user = users.find((u:UsersInfo)=>u.id===id)
  res.writeHead(200 ,{ "content-type" :" application/json"})
   res.end(JSON.stringify({massage: `user no - ${id}` , data:{user}} ))
} else if (method==="POST" && url ==="/users"){

const body = await parsedBody(req)
const newUser ={
    id: Date.now(),
    ...body
}
const users =readUsers()
users.push(newUser)

writeUsers(users)
  res.writeHead(200 ,{ "content-type" :" application/json"})
   res.end(JSON.stringify({massage: "user created successfully", data:{newUser}} ))

}
 else if ((method === "PUT" || method === "PATCH") && id !== null) {
     const body = await parsedBody(req);
     const users = readUsers();
 
     const index = users.findIndex((u: UsersInfo) => u.id === id);
     // console.log(index)
     if (index < 0) {
       res.writeHead(404, { "content-type": " application/json" });
       res.end(
         JSON.stringify({ massage: "The index is not found", data: null }),
       );
       return;
     }
 // users[index] = { ...users[index], ...body }  --- patch behavior
     users[index] = { id: users[index].id, ...body };
 
     writeUsers(users);
     res.writeHead(200, { "content-type": " application/json" });
     res.end(
       JSON.stringify({
         massage: "users updated successfully",
         data: users[index],
       }),
     );
   }
}