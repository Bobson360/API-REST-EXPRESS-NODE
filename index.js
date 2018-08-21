const express = require('express')
const bodyParser = require('body-parser')

const app = express()


var userRouter = require('./userRoutes')

app.use(bodyParser.json())

//Meu primeiro middleware
app.use( (req, res, next) => {
    console.log('Incluido um primeiro Middelewere que intercepta as chamadas as APIs.')
    next()
})
/*
app.use( (req, res, next) => {
    console.log('Incluido um segundo Middelewere que intercepta as chamadas as APIs.')
    next()
})

app.use( (req, res, next) => {
    console.log('Incluido um terceiro Middelewere que intercepta as chamadas as APIs.')
    next()
})
*/
app.use('/user', userRouter)

//Primeira API
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/json/resp', (req, res) => {
    var obj = {
        date: Date.now(),
        resposta: 'Chamada bem sucedida.'
    }
    res.send(obj)
})

// API enviando paramametros
// Muito utilisado para metodos DELETE e PUT para remoção ou atualização

app.get('/parametro/:userId', (req, res) => {
    console.log(req.params)
    var obj = {
        idRecebido: req.params.userId
    }
    res.send(obj)
})
//Utilizado para criação de objetos
app.post('/incluir', (req, res) => {
    console.log(req.body)
    var obj = {
        nomeRecebido: req.body.nome
    }
    res.send(obj)
})


var handleErrors = (err, req, res, next) => {
    console.log('Tratar qualquer erro de alto nível aqui')
    console.log(err)
    res.status(500).json({resposta:'Algo está errado'})
}
//Erro tratado Aqui
//Depois de todas as rotas
app.use(handleErrors)

const PORT = 3000
const HOST = 'localhost'
app.listen(PORT, () => {
    console.log('O servidor esta respondendo em http://%s:%s', HOST, PORT)
})