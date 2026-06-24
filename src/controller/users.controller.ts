import type { IncomingMessage, ServerResponse } from "node:http"
import { readUsers, writeUsers } from "../service/users.service"
import type { UsersInfo } from "../types/users.types"
import { parsedBody } from "../utility/parsedBody"
import { sendResponse } from "../utility/sendResponse"


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

if (method === "GET" && url === "/users") {
    try {
        const users = readUsers();
        return sendResponse(res, 200, true, "All users retrieved successfully", users)
    } catch (error) {
        return sendResponse(res, 500, false, "Something went wrong")
    }

} else if (id !== null && method === "GET") {
    try {
        const users = readUsers();
        const user = users.find((u: UsersInfo) => u.id === id);
        if (!user) return sendResponse(res, 404, false, "User not found")
        return sendResponse(res, 200, true, `User no - ${id}`, user)
    } catch (error) {
        return sendResponse(res, 500, false, "Something went wrong")
    }

} else if (method === "POST" && url === "/users") {
    try {
        const body = await parsedBody(req);
        const newUser = { id: Date.now(), ...body };
        const users = readUsers();
        users.push(newUser);
        writeUsers(users);
        return sendResponse(res, 201, true, "User created successfully", newUser)
    } catch (error) {
        return sendResponse(res, 500, false, "Something went wrong")
    }

} else if ((method === "PUT" || method === "PATCH") && id !== null) {
    try {
        const body = await parsedBody(req);
        const users = readUsers();
        const index = users.findIndex((u: UsersInfo) => u.id === id);
        // console.log(index)
        if (index < 0) return sendResponse(res, 404, false, "User not found")
        // users[index] = { ...users[index], ...body }  --- patch behavior
        users[index] = { id: users[index].id, ...body };
        writeUsers(users);
        return sendResponse(res, 200, true, "User updated successfully", users[index])
    } catch (error) {
        return sendResponse(res, 500, false, "Something went wrong")
    }

} else if (method === "DELETE" && id !== null) {
    try {
        const users = readUsers();
        const index = users.findIndex((u: UsersInfo) => u.id === id);
        if (index < 0) return sendResponse(res, 404, false, "User not found")
        users.splice(index, 1);
        writeUsers(users);
        return sendResponse(res, 200, true, "User deleted successfully")
    } catch (error) {
        return sendResponse(res, 500, false, "Something went wrong")
    }
}
}