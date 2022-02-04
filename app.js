const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const session = require('express-session')
const cookieParser = require('cookie-parser');
const mongoDBSession = require('connect-mongodb-session')(session);
const mongoose = require('mongoose')

dotenv.config();
const { APP_LOCALHOST : hostname, APP_PORT: port } = process.env;
const app = express();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()


//--------------------------------------------------------------------
//      Mise en place du moteur de template
//--------------------------------------------------------------------
app.use(express.static(path.join('public')));
app.set('views', path.join('views'));
app.set('view engine', 'pug');



//Connect to DB
mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true}, () => {
    console.log('connected to db!');
})

const store = new mongoDBSession({
    uri: process.env.DB_CONNECT,
    collection: 'sessions'
})



//--------------------------------------------------------------------
//      Chargement des middlewares
//--------------------------------------------------------------------
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(session({secret: process.env.SESSION_SECRET,
    key: "session",
    saveUninitialized:true,
    resave: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    store: store
}));
// express-messages middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//Route MiddleWares
app.use(function(req,res,next){
    res.locals.session = req.session;
    next();
});

//--------------------------------------------------------------------
//      Ajout du midlleware express flash messages
//--------------------------------------------------------------------
const flash = require('express-flash-messages');
app.use(flash());



//--------------------------------------------------------------------
//      Chargement des routes
//--------------------------------------------------------------------
require('./routes/routes.js')(app);



app.listen(port, () => console.log('Server Up and running'));

