const express = require("express")
const router = express.Router()
const service = require("../../../service/notes-service.js")

router.get(process.env.BASE_URL+"/notes/api/v1/rest/notes",
    async function(req, resp){
        const response = await service.getAll()
        return resp.status(200).send(response)
})

module.exports = router