const express = require ('express')
const handlebars = require ('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const admin = require('./routes/admin')
const path = require ('path')
const mongoose = require ('mongoose')
const session  = require ('express-session')
const flash = require ('connect-flash')

// configurações
    // session
    app.use(session({
        secret: 'learningnode',
        resave: true,
        saveUninitialized: true
    }))
    app.use(flash())

    // middlewares
    app.use((req,res,next) =>{
        res.locals.success_msg = req.flash("success_msg"[0])
        res.locals.error_msg = req.flash("erro_msg"[0])
        next()
    })
    // body parser
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())
    // handlebars
    app.engine('handlebars', handlebars.engine({ extname: 'handlebars', defaultLayout: 'main', layoutsDir: __dirname + '/views/layouts/' }))
    app.set('view engine', 'handlebars');
    // mongoose
    mongoose.Promise = global.Promise
    mongoose.connect('mongodb://127.0.0.1/blogapp').then(() =>{
        console.log('Conectado ao banco.')
    }).catch((err) =>{
        console.log('Falha ao conectar ao banco.' + err)
    })
    // public
    app.use(express.static(path.join(__dirname,'public')))

    // rotas
        app.get('/', (req,res) =>{
            res.send('Home page.')
        })
        app.use('/admin', admin)
    // outros
    const PORT = 8081
    app.listen(PORT, () =>{
        console.log("Servidor rodando.")
    })