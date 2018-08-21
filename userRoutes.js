var express = require('express')
var router = express.Router()

//Uma forma é utilizando router.use({req, res, next})
router.all('*', (req, res, next) => {
    console.log('Simples filtro')
    next()
})

router.get('/', (req, res) => {
    res.json( { resposta: 'Cheguei a raiz da API de usuários.' })
})

router.get('/details', (req, res) => {
    res.json( { resposta: 'Cheguei a raiz da API de usuários.' })
})

module.exports = router