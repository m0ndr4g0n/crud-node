const express = require ('express')
const handlebars = require ('express-handlebars')
const bodyparser = require ('body-parser')
const bodyParser = require('body-parser')
const app = express()
const admin = require('./routes/admin')
//const mongoose = require ('mongoose')

// configurações
    // body parser
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())
    // handlebars
    app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')
    // mongoose
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