module.exports = class Logout {
    
    logout(req, res) {
        req.session.loggedIn = false;
        res.redirect('/');
    }
}