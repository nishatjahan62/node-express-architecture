import path from "path";
import fs from "fs";


const filePath =path.join(process.cwd(),"src/database/db.json")


export const readUsers = ()=>{
const users = fs.readFileSync(filePath , ("utf-8"))
const data = JSON.parse(users)
return data.users
}