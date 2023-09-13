
const express = require("express")
const router = express.Router()

const {getDatas,createData,updateDatas,deleteDatas} = require("../3-controllers/data")

    router.route("/").get(getDatas).post(createData).patch(updateDatas).delete(deleteDatas)

    module.exports = router