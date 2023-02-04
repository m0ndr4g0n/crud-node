const mongoose = require ('mongoose')
mongoose.connect("mongodb://127.0.0.1:27017/learning",{
    useNewUrlParser:true,
    useUnifiedTopology: true
}).then(() =>{
    console.log('Conectado ao mongoDB.')
}).catch((err) =>{
    console.log('Não foi possível conectar ao mongoDB: ' + err)
})

// model - usuarios
// definindo o model
const UserSchema = mongoose.Schema({
    nome: {
        type: String,
        require: true
    },
    sobrenome:{
        type: String
    },
    idade:{
        type: Number
    },
    email:{
        type: String
    },
    pais:{
        type: String
    }
})
// collection
mongoose.model('usuarios', UserSchema)

const Usuario =  mongoose.model('usuarios')
new Usuario({
    nome: "john",
    sobrenome: "mond",
    email: "topg@matrixisdone.com",
    idade: 28,
    pais: "USA"
}).save().then(() => {
    console.log('Novo usuário criado.')
}).catch((err)=> {
    console.log('Não foi possível criar esse usuário.' + err)
})