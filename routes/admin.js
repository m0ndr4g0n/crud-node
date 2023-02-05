const router = require('express').Router()
const mongoose = require ('mongoose')
require('../models/Categoria')
const Categoria = mongoose.model("categorias")

router.get('/', (req, res) =>{
    res.render("./admin/index")
})

router.get('/posts', (req, res) =>{
    res.send('Página de posts.')
})

router.get('/categorias', (req, res) =>{
    Categoria.find().lean().sort({date: 'desc'}).then((categorias) =>{
    res.render('./admin/categorias', {categorias: categorias})
    }).catch((err) =>{
        req.flash("error_msg", "Houve um erro ao listar as categorias.")
        res.redirect("/admin")
    })
})

router.get('/categorias/add', (req,res) =>{
    res.render('./admin/addcategorias')
})

router.get('/categorias/edit/:id', (req,res) =>{
    Categoria.findOne({_id:req.params.id}).lean().then((categorias) =>{
        res.render("./admin/editcategorias", {categorias: categorias})
    }).catch((err)=>{
        req.flash("error_msg", "Essa categoria não existe")
        res.redirect("/admin/categorias")
    })
})

router.post('/categorias/nova', (req,res) =>{

    let erros = []

    if(!req.body.nome || typeof req.body.nome == undefined){
        erros.push({texto: "Nome inválido"})
    }

    if(!req.body.slug || typeof req.body.slug == undefined){
        erros.push({texto: "Slug inválido"})
    }

    if (req.body.nome.length < 2){
        erros.push({texto: 'O nome da categoria é muito pequeno'})
    }

    if(erros.length > 0){
        res.render("./admin/addcategorias", {erros: erros})
    }
    else{   
        const novaCategoria = {
        nome: req.body.nome,
        slug: req.body.slug
    }

    new Categoria(novaCategoria).save().then(() => {
        req.flash("success_msg", "Categoria criada com sucesso!")
        res.render('./admin/categorias',({success_msg: req.flash('success_msg')}))

    }).catch((err) =>{
        req.flash("error_msg", "Houve um erro ao tentar salvar a categoria, tente novamente.")
        console.log('Erro ao salvar categoria: ' + err)
    })}

})


module.exports = router