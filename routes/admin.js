const router = require('express').Router()

router.get('/', (req, res) =>{
    res.send('Página principal admin.')
})

router.get('/posts', (req, res) =>{
    res.send('Página de posts.')
})

router.get('/categorias', (req, res) =>{
    res.send('Página de categorias.')
})


module.exports = router