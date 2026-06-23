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
}