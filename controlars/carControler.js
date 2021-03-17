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
             res.json({car , message:"the car add tto the data base"})
        } catch (error) {
            next(error)
        }
    },


    index : async(req,res,next)=>{
        try {


            const carss = await cars.findAll({include : users})
             carResours(res , carss)

        } catch (error) {
            next(error)
        }
    },


    show : async(req,res,next)=>{
        try {
            
            const car1 = await cars.findOne({where:{id:req.params.id} , include:users  }  )
            console.log(car1)
            carResours(res , car1)
        } catch (error) {
            next(error)
        }


    },
    update : async(req,res,next)=>{
        try {

            const car2 = await cars.findOne({where:{id:req.params.id}})
            if(!car2)res.send("THERES NO CAR ")
            else{
                const {carName , model} = req.body
                const id = req.params.id
                console.log(carName , model , id)
                    await cars.update({carName:carName , model:model} , {where:{id:id}})
                    const car2 = await cars.findOne({where:{id:req.params.id}})
                    res.send(car2)
            }
        } catch (error) {
            next(error)
        }

    },
    delete : async(req,res,next)=>{
        const car = await cars.findOne({where:{id:req.params.id}})
        if(car){
            await cars.destroy({where:{id:req.params.id}})
        res.send("DONE the car deleted ")
             }
        else{
            res.send("the car is already deleted")
        }

    },
}