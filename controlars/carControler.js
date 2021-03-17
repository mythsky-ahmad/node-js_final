const {users , cars} = require('../models')
const carResours = require('../resourses/carResours')

// const carResours = require('../resourses/carResours')


module.exports= {
    store : async(req,res,next)=>{
        try {
            const {carName , model} = req.body
            const userid = req.user.aud
            const car = await cars.create({carName , model , userid})
            console.log(userid , carName , model )
            carResours(res , car)
            //  res.json(car)
        } catch (error) {
            next(error)
        }
    },
    index : async(req,res,next)=>{
        try {
            const carss = await cars.findAll({include:users})
            res.send(carss)

        } catch (error) {
            next(error)
        }
    },
    show : async(req,res,next)=>{

    },
    update : async(req,res,next)=>{

    },
    delete : async(req,res,next)=>{

    },
}