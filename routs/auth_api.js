
const express = require('express');
const router = express.Router();
const {verifyAccessToken} = require('../resourses/jwt_helpser');

const AuthControler = require('../controlars/authControlers');
const postControler = require('../controlars/postsControlers');
const userControler = require('../controlars/usersControlers');
const carControler = require('../controlars/carControler');

resource=(controler ,router , resource )=>{
    router.get(`/${resource}/` , controler.index)  // done for post  and usrers
    router.get(`/${resource}/:id`, controler.show)  // done for post   and users
    router.post(`/${resource}/`, controler.store)   // done for post 
    router.put(`/${resource}/:id`, controler.update) // done for post  and users
    router.delete(`/${resource}/:id`, controler.delete)  // done for post and users
}
// auth controlers
router.post('/register', AuthControler.register);
router.post('/login', AuthControler.login);
router.post('/refresh-token',AuthControler.refresh_token);
router.delete('/logout', AuthControler.logout);
resource(postControler , router , 'posts');
resource(userControler , router , 'users');
resource(carControler , router , 'cars');

module.exports = router

