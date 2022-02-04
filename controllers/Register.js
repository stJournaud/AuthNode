const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { registerValidation } = require('../routes/validation');
module.exports = class Register {

    print(req, res) {
        res.render('register');
    }

    register = async (req, res) => {
        let errorMessage = null;
        //Validation of datas
        const {error} = registerValidation(req.body);
        if(error) errorMessage = error.details[0].message;
    
        //Checking if the user is already in the database
        const emailExist = await User.findOne({email: req.body.email});
        if(emailExist) errorMessage = 'Email already exists';
    
        //HASH password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
        if(!errorMessage) {
            //Create a new user
            const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
            });
        try{
            const savedUser = await user.save();
            res.render('login', {
                success: req.flash('success')
            })
        } catch(err) {
            res.status(400).send(err);
        }
        } else {
            res.render('register',{
                error: req.flash('error', errorMessage),
            });
        }
        
    };
    
}   