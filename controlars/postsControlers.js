const { sequelize, users, Posts } = require('../models')

const creatError = require('http-errors')

const postResours = require('../resourses/postResours')

module.exports = {

    index: async (req, res) => {
        try {
            const posts = await Posts.findAll({ include: users })

            return postResours(res ,posts)
            // return res.json(posts)
        } catch (err) {
            console.log(err)
            return res.status(500).json(err)
        }
    },

    update: async (req, res) => {
        try {
            const postId = req.params.id
            console.log(postId)
            const newBody = await Posts.update({ body:req.body.body} , {where : {id:postId}})
            res.send("post has been updated")
        } catch (err) {
            console.log(err)
            return res.status(500).json(err)
        }
    },

    delete: async (req, res, next) => {
        try {
        const id = req.params.id
        const post = await Posts.findOne({ where: { id } })
        
            if (!post)
                res.send("the post already got  deleted")
            else {
                Posts.destroy({ where: { id } })
                res.send("the post deleted")
            }
        } catch (error) {
            next(error)
        }

    },
    store: async (req, res, next) => {
        try {
            const userId = req.user.aud;
            const post = await Posts.create({body:req.body.body , userid:userId})
            res.send(post)
        } catch (error) {                                            
            next (error)
        }

    },
    show: async (req, res, next) => {  // get one user with the post id id 
            try {
                post = await Posts.findOne({where:{id:req.params.id}})
                res.json(post)
                console.log("asdhgasuyfduya")
            } catch (error) {
                next(error)
            }
    }
}