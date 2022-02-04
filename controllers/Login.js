const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { loginValidation } = require('../routes/validation');
session = require('express-session')
module.exports = class Login {

    print(req, res) {
        res.render('login');
    }

    login = async (req, res) => {
        let errorMessage = null;
        //Validation of datas
        const {error} = loginValidation(req.body);
        if (error) errorMessage = error.details[0].message

        //Checking if the email already exists
        const user = await User.findOne({
            email: req.body.email
        });
        console.log('user', user);
        if (user == null) {
            errorMessage = 'Email not found';
        } else {
            //Checking if password is correct
            const validPass = await bcrypt.compare(req.body.password, user.password);
            if (!validPass) errorMessage = 'Invalid password';
        }

        if (!errorMessage) {
            req.session.loggedIn = true;
            req.flash('success', 'You are connected')
            res.render('index', {
                loggedIn: session.loggedIn,
                success: req.flash('success')
            });
        } else {
            res.render('login', {
                error: req.flash('error', errorMessage),
            });
        }

    }
}