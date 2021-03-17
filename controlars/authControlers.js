

const creatError = require('http-errors')
const { sequelize, users, Posts } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {signAccessToken , signRefreshToken, verifyRefreshToken} = require('../resourses/jwt_helpser')

module.exports = {

    register: async (req, res, next) => {
        try {
            const { email, password } = req.body
            if (!email || !password) throw creatError.BadRequest()
            else {
                const { name, email, role, password } = req.body;

                try {
                    const doseExist = await users.findOne({ where: { email: email } })
                    if (doseExist) throw creatError.Conflict(`${email} is already regqsterd`)
                    const hasshedPassword = await bcrypt.hash(password, 10)
                    // creating user in database 
                    const user = await users.create({ name, email: email.toLowerCase(), role: role, password: hasshedPassword })

                    return res.json({ user })
                } catch (err) {
                    console.log(err)
                    return res.status(400).json(err)
                }
            }
        } catch (error) {
            next(error)
        }
    },

    login: async (req, res, next) => {

        try {
            const name = req.body.name
            const user = await users.findOne({ where: { name: name } })
            if (!user) res.json(creatError.NotFound("user is not regester"))

            const isMatch = await bcrypt.compare(req.body.password, user.password)
            if (!isMatch) res.json(creatError.Unauthorized('Username/password not valid'))
            const accessToken = await signAccessToken(user.id)
            const refreshToken = await signRefreshToken(user.id)
            res.send({ accessToken, name: `WELCOM ${user.name}`, refreshToken })
        }

        catch {
            next(err)
        }
    },


    refresh_token: async (req, res, next) => {
        try {
            // const fullrefreshToken = req.headers['authorization']
            // const refreshToken = fullrefreshToken.split(' ')[1]
            const refreshToken = req.body.refreshtoken
            if (!refreshToken) throw creatError.BadRequest()
            const userid = await verifyRefreshToken(refreshToken)
            console.log(`bbbbbbbbbbbbbbbbbbbbbbb${userid}`)
            const accessToken = await signAccessToken(userid)
            const refreshtoken = await signRefreshToken(userid)
            res.send({ accessToken, refreshtoken })
        } catch (error) {
            next(error)
        }
    },

    logout: async (req, res, next) => {
        try {
            // console.log(user.reefreshtoken)
            // const fullrefreshToken = req.headers['authorization']avfav
            // jgfgkjf
            // const refreshToken = fullrefreshToken.split(' ')[1]
            const refreshToken = req.body.refreshtoken
            if (!refreshToken) throw creatError.BadRequest()
            console.log(refreshToken)
            const userid = await verifyRefreshToken(refreshToken)
            console.log(userid)
            user = await users.findOne({ where: { id: userid } })
            console.log(user.reefreshtoken)
            if (user.reefreshtoken === refreshToken) {
                await users.update({ reefreshtoken: "null" }, { where: { id: userid } })
                res.send("REFRESH TOKEN HAS BEEN DELETED")
            }

        } catch (error) {
            next(error)
        }
    }
}