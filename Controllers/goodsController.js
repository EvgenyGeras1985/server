const uuid = require("uuid");
const path = require("path");
const {Goods} = require("../models/models");

class goodController{
    async getAll(req,res){
        const goods = await Goods.findAll()
        return res.json(goods)
    }

    async create(req, res){
        try{
            const {price,name} = req.body;
            const {file} = req.files;
            let fileName = uuid.v4() + ".png";
            await file.mv(path.resolve(__dirname,'..',"static",fileName))
            const good = await Goods.create({name, price: +price, img:fileName})
            return res.json(good);
        }catch (err){
            console.log(err);
        }
    }

    async delItem(req, res) {
        console.log("method delete start...");
        const {name} = req.query;
        const nameValue = name;
        await Goods.destroy({ where :{ name:nameValue }})
    }


    async getOne(req,res){
        const {name} = req.params;
        console.log(req.body);
        const nameValue = name;
        const answer = await Goods.findOne( { where:{name:nameValue}});
        return  res.json(answer)
    }

}

module.exports = new goodController();