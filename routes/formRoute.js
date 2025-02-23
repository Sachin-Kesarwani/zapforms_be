

let {Router} = require("express")
const { createform, submitform, respondformData } = require("../controller/formcotroller")
const { isAuthorizedUser } = require("../middleware/authmiddleware")

let createformRouter=Router()


createformRouter.post("/createform",isAuthorizedUser,createform);
createformRouter.get("/respond/:id" ,isAuthorizedUser, respondformData)
createformRouter.post("/subimt-response",isAuthorizedUser,submitform);

module.exports ={createformRouter}