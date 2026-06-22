// common -js 
/* 
import the "file1" from file1

*/

// const file1 =require('./file-1')
const {a : x} =require('./file-1')
const {a: y} =require("./file-3")

// console.log(file1)
// console.log(x,y)

// exporting functions from utilities

// const addFunc = require("./utilities/add")
const {addFunc} = require("./utilities")
const subFunc = require("./utilities/sub")



console.log("additions = ",addFunc(x,y))
// console.log(subFunc("subtraction = ",x,y))

