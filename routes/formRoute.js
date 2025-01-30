

let {Router} = require("express")
const { createform, submitform } = require("../controller/formcotroller")
const { isAuthorizedUser } = require("../middleware/authmiddleware")

let createformRouter=Router()


createformRouter.post("/createform",isAuthorizedUser,createform);
createformRouter.post("/subimt-response",isAuthorizedUser,submitform);

module.exports ={createformRouter}