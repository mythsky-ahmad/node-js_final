// require('dotenv').config()
const jwt = require('jsonwebtoken')
const creatError = require('http-errors')
const { sequelize, users, Posts } = require('../models')

//craeting an access token 

module.exports = {
    signAccessToken :(userId) =>{
        return new Promise ((resolve , reject)=>{
            const payload ={
                name:"yours truly",
                // exp : '15s',
                // iss:"yourwebsite.com"
                aud:userId,
            }
            const secret = process.env.ACCESS_TOKEN_SECRET
            const options={
                expiresIn:"1h",
                issuer:"yourwebsite.com",
                // audience:[userId],
            }

            jwt.sign(payload , secret , options , (err , token)=>{
                if(err) {
                    reject(creatError.InternalServerError())
                }
                // reject (err)
                resolve(token)
               
            })    
        })
    },

// verifyAccessToken : (req , res , next)=>{
//     if(!req.headers['authorization']) return next(creatError.Unauthorized())
//     const authHeader = req.headers['authorization']
//     const bearerToken = authHeader.split(' ')
//     const token = bearerToken[1]

//     jwt.verify(token , process.env.ACCESS_TOKEN_SECRET , (err,payload)=>{
//         if(err){
//             // if(err.name === 'JsonWebTokenError'){
//             //     return next(creatError.Unauthorized(err.message))
//             // }else{
//             //     return next(creatError.Unauthorized(err.message))
//             // }
//             const message = err.name ==='JsonWebTokenError' ? "Unauthorized":err.message
//             return next(creatError.Unauthorized(message))
//         }
//     req.payload = payload

//     next()

//     })


//     },

signRefreshToken :(userId) =>{
    return new Promise ( (resolve , reject)=>{

        const payload ={}
        const secret = process.env.REFRESH_TOKEN_SECRET
        const options={
            expiresIn:"1y",
            issuer:"yourwebsite.com",
            audience:[userId],
        }

        jwt.sign(payload , secret , options ,  (err , token)=>{
            if(err) {
                reject(creatError.InternalServerError())

            }
            resolve(token , users.update({reefreshtoken:token} , {where : {id:userId}}) )
        })   
         
    })
},

verifyRefreshToken : (refreshtoken)=>{
    return new Promise((resolve , reject  , next)=>{
        jwt.verify(refreshtoken , process.env.REFRESH_TOKEN_SECRET , async(err , payload)=>{
            console.log(refreshtoken)
            if(err) return reject(creatError.Unauthorized("testing if its unauthorizeed"))
            const id = await payload.aud
            console.log(`aaaaaaaaaaaaaaaaaaaaaaaaaaaa${id}`)
            const user = await users.findOne({where:{id}})
            try{
                if(user.reefreshtoken === refreshtoken)resolve(id)
                reject(creatError.Unauthorized("the refresh token is not on the data base / deleted"))
                
            }catch(err){
                return creatError.Unauthorized()
            }
            
        })
    })
}


}



