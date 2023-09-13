
const DataSchema = require("../6-schema/data")

const getDatas = async(req,res) => {

    const{name,company,featured,numericFilters,sort,fields} = req.query

    let obj = {}

        if(name) {
            obj.name = {$regex:name,$options:"i"}
        }
        if(company) {
            obj.company = company
        }
        if(featured) {
            obj.featured = featured === "true" ? true : false
        }
        if(numericFilters) {

            const operationMap = {
                ">" : "$gt",
                ">=" : "$gte",
                "=" : "$eq",
                "<" : "$lt",
                "<=" : "$lte"
            }

            const regEx =  /\b(<|>|>=|=|<|<=)\b/g;

            let filters = numericFilters.replace(regEx,
                (match)=>`-${operationMap[match]}-`)

            const options = ["price","rating"]

                filters = filters.split(",").forEach(item => {
                    const [field, operator, value] = item.split("-")
                    if(options.includes(field)) {
                        obj[field] = {[operator] : Number(value)}
                    }
                });
        }

    let result = DataSchema.find(obj)

        if(sort) {
            const sortList = sort.split(',').join(' ');
            result = result.sort(sortList);
        }else {
            result = result.sort("createdAt")
        }

        if(fields) {
            const fieldList = fields.split(",").join(" ");
            result = result.select(fieldList)
        }

    // const page = Number(req.query.page) || 1
    // const limit = Number(req.query.limit) || 10
    // const skip = (page - 1) * limit
    //     result = result.skip(skip).limit(limit)

    const datas = await result


    res.status(200).json({nmHits:datas.length,datas})
}

const createData = async(req,res) => {
    try {
        const data = await DataSchema.create(req.body)
        res.status(200).json({data})
    } catch (error) {
        res.status(500).send(error)
    }
}

const updateDatas = async(req,res) => {
    try {
        let obj = {}
        const{_id} = req.query

        if(_id) {
            obj._id = _id
        }

        const datas = await DataSchema.findOneAndUpdate(obj,req.body,{
            new:true,
            // runValidators:true
        })
        res.status(200).json(datas)
    } catch (error) {
        res.status(500).send(error)
    }
}

const deleteDatas = async(req,res) => {
    try {
        let obj = {}
        const{_id} = req.query

        if(_id) {
            obj._id = _id
        }

        const datas = await DataSchema.findOneAndDelete(obj)
            console.log(_id);
        res.status(200).json(datas)
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {getDatas,createData,updateDatas,deleteDatas}