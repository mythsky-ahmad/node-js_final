

const { sequelize, users, Posts } = require('../models')
const bcrybt = require('bcrypt')
const userResours = require('../resourses/userResource')

module.exports = {

    index: async (req, res) => {  /// get all users
        try {
            const all_users = await users.findAll()
            
            const page = parseInt(req.query.page)
            const limit = parseInt(req.query.limit)

            const startIndex = (page - 1) * limit
            const endIndex = page * limit 

            // const result ={}
            // if(endIndex < all_users.length){
            //     result.next = {
            //         page:page + 1 ,
            //         limit:limit
            //     }     
            // }

            // if(startIndex > 0){
            //     result.previous = {
            //         page:page - 1 ,
            //         limit:limit
            //     }  
            // }
      

            const result = all_users.slice(startIndex , endIndex)

            return userResours(res , result)
            // return res.json(result)
        } catch (err) {
            console.log(err)
            return res.status(500).json("FORBEDD")
        }
    },

    show: async (req, res , next ) => {   // get one user
        const id = req.params.id
        try {
            const user = await users.findOne({
                where: { id },
            })
            if(!user)return res.json(`user with ${id} id  not found`)
            return res.json(user)

        } catch (err) {
            console.log(err)
            return res.status(500).json("somthing wrong")
      
        }

    },


    store: async (req ,res , next)=>{
        try {
            const {name , email , password , role} = req.body
            console.log({name , email , password , role})
            const hasshedPassword = await bcrybt.hash (password , 10)
            console.log(hasshedPassword)
            const user = await users.findOne({where:{ name:name  }})
            if(!user) {
                try {
                    const user1 = await users.create({ name:name , password:hasshedPassword , email:email , role:role})
                    res.json(user1)
                } catch (error) {
                    res.send(error.errors[0].message)
                }
            }            
            else{
                res.send('there is already user have this name')    
            }

        } catch (error) {
            next(error)
        }

    },
    

    update: async(req , res , next )=>{
            try {
                const Newuser = await users.findOne({where : {id :req.params.id}})
                if(!Newuser)res.send("the user Is Not found")
                else{
                    const hasshedPassword = await bcrybt.hash(req.body.password , 10)
                    console.log(hasshedPassword)
                     await users.update({name:req.body.name , email:req.body.email , password:hasshedPassword} , {where:{id:req.params.id}})
                    console.log("the users Updated")
                    res.send(Newuser)
                }

            } catch (error) {
                next(error)
            }
    },


    delete : async (req,res,next)=>{
        try {
           
            const userid = req.params.id
            const user = await users.findOne({where:{id:userid}})
            if(!user)res.send("the users not found you want to delete  / ((delete__usersControlers))")
            await users.destroy({where:{id:userid}})
            console.log(userid)
            res.send(` the user with ${userid} id has been deleted `)
        } catch (error) {
            next(error)
        }

    }

}