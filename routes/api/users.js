const express = require("express");
const router = express.Router();
const gravatar = require('gravatar'); 
const bcrypt = require('bcryptjs'); // Optimized bcrypt in JavaScript with zero dependencies.
const jwt = require('jsonwebtoken'); 
const config = require('config'); 
const { check, validationResult } = require("express-validator");

const User = require('../../models/User'); 

// @route   POST api/users
// @desc    Register User
// @access  Public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password should have atleast 6 chars").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()}); 
    }

    const {name, email, password} = req.body; 

    try{
        // See if User exist
        let user = await User.findOne({email: email}); 

        if(user) {
            return res.status(400).json({errors: [{ msg : 'User Already Exist'}]}); 
        }

        // Get User Gravatar
        const avatar = gravatar.url(email, {
            s: '200', // size
            r: 'pg', // rating
            d: 'mm' // default
        }); 

        // creating User Instinct
        user = new User({
            name, 
            email, 
            avatar, 
            password
        });

        // Encrypt Paasword (uisng bcryptjs)
        const salt = await bcrypt.genSalt(10); // salting: Salting is simply the addition of a unique, random string of characters known only to the site to each password before it is hashed  

        user.password = await bcrypt.hash(password, salt); 

        // save the User
        await user.save(); 

        // Return JsonWebToken
        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(
            payload, 
            config.get('jwtSecret'), 
            {expiresIn: 360000}, 
            (err, token) => {
                if(err) throw err; 
                res.json({ token }); 
            }); 

    } catch(err){
        console.error(err.message); 
        res.status(500).send('Server Error'); 
    }
    
  }
);

module.exports = router;
