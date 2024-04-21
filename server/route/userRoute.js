const express=require("express")
const router=express.Router()

router
    .route("/")
    .get(getDestination)
    .post(/*orderChecking,*/postDestination)    //It is called middleware chaining 

router
    .route("/:id")
    .get(getDestinationById)
    .patch(patchDestination)
    .delete(deleteDestination)

module.exports=router
