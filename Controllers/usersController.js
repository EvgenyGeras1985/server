const {User} = require("../models/models");
const ApiError = require("../error/apiError");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class userController{
    async registration(req, res,next){
        try{
            const {mail, pass} = req.body;
            if(!mail || !pass){
                return next(ApiError.badRequest('Некорректный email или password'))
            }
            const candidate = await User.findOne({
                where:{mail}
            })
            if(candidate){
                return next(ApiError.badRequest('Такой пользователь уже существует'))
            }
            const hashPassword = await bcrypt.hash(pass, 5)
            const user = await User.create({mail, role:"USER", password: hashPassword})
            const token = jwt.sign({
                    id:user.id,
                    mail:user.mail,
                    role:user.role
                },
                process.env.SECRET_KEY,
                {expiresIn: '2h'}
            )
            return res.json({token})
        }catch(err){
            console.log(err);
        }
    }

    async login(req, res,next){
        const {mail, pass} = req.body;
        const candidate = await User.findOne({
            where:{mail}
        })
        if(!candidate){
            return  next(ApiError.badRequest('Такой пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(pass, candidate.password);
        if(!comparePassword){
            return  next(ApiError.badRequest('Такой пользователь не найден'))
        }
            const token = jwt.sign({
                    id:candidate.id,
                    mail:candidate.mail,
                    role:candidate.role
                },
                process.env.SECRET_KEY,
                {expiresIn: '2h'}
            )
            return res.json({token})
        }

    async check(req,res){
        const token = jwt.sign({
                id:user.id,
                mail:user.mail,
                role:user.role
            },
            process.env.SECRET_KEY,
            {expiresIn: '2h'}
        )
        return res.json({token})
    }
}

module.exports = new userController();