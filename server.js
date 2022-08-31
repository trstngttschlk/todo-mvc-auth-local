// Required Packages
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('express-flash')
const logger = require('morgan')
// Middleware
const connectDB = require('./config/database')
// declare routes
const mainRoutes = require('./routes/main')
const todoRoutes = require('./routes/todos')

require('dotenv').config({path: './config/.env'})

// Passport config
require('./config/passport')(passport)

// Connect to database
connectDB()

// sets app to use ejs
app.set('view engine', 'ejs')
// set routes to our static files
app.use(express.static('public'))
// url encoding
app.use(express.urlencoded({ extended: true }))
// parse body in request from json
app.use(express.json())
// set logging in dev envirvonment
app.use(logger('dev'))

// Sessions
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )
  
// Passport middleware
app.use(passport.initialize())
app.use(passport.session()) // saves sessions

app.use(flash())

// Routes
app.use('/', mainRoutes)
app.use('/todos', todoRoutes)
 
app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!')
})    