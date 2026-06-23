import path from "path"
import fs from "fs"

const filePath= path.join(process.cwd(), "src/database/db.json")

export const readProduct=()=>{
    // console.log(process.cwd()) // -- returns the current working directory 
    // console.log(filePath)

    const products = fs.readFileSync(filePath , ("utf-8")) // -- utf-8 make data human readable. 
// readFileSync -- synchronous, blocks until file is read, simple to use
// readFile     -- asynchronous, non-blocking, requires callback or promise
// using readFileSync here because there is no third party db (using local json file)

const data = JSON.parse(products)
// console.log(data.products)
const productsData = data.products
return productsData

}