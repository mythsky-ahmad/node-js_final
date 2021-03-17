require('dotenv').config()
const jwt = require('jsonwebtoken')
const express = require ('express')
const morgan = require('morgan')
const creatError = require('http-errors') 
const authRout =require('./routs/auth_api')
const postsRout = require('./routs/postsRouts') 
const usersRout = require('./routs/usersRouts')
// const {verifyAccessToken} = require('./helpers/jwt_helpser')
const verfiyToken = require('./middleware/verfiyToken')
const errorHandeler = require('./middleware/appMiddleware')
// const {sequelize  , users , Posts} = require('./models')
const app = express()
const middleware = require('./middleware/appMiddleware')

app.use(morgan('dev')) // to log our req
app.use(express.json())
app.use(express.urlencoded({extended : false }))

app.use(errorHandeler.errorHandler)
app.use(verfiyToken.verifyToken)
app.get('/' ,  async (req,res,next)=>{
    console.log('Hello From Express')
    res.send('Hello From Express')
})

app.use('/api' ,authRout )



// const whitelist = ['http://localhost:4200' , 'http://172.0.0.1:4200' , 'http://172.0.0.1:5000' , 'http://172.0.0.1:4200' ]


const PORT = process.env.PORT || 8000 
app.listen(PORT , async ()=> {
    console.log(`the server is running on port ${PORT}`)
    // await sequelize.authenticate()
    console.log("database connicted !!!!")
})
