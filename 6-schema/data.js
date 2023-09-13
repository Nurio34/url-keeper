
const mongoose = require("mongoose")

const DataSchema = new mongoose.Schema({
    title:{
        type:String
    },
    url:{
        type:String
    },
    imgUrl:{
        type:String
    }
})

module.exports = mongoose.model("DataModel", DataSchema)