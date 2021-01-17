const express = require('express')
const cors = require("cors")

const { FgYellow, FgGreen } = require('./colors')
const { word_list } = require('./data')

const app = express()

app.use(cors())
app.use('/', express.static('gallow'))
app.use('/v2', express.static('gallow_v2'))

const myLogger = function (req, res, next) {
    console.log("logger")
    next()
}

app.use(myLogger)

app.get('/v2/word', function (req, res) {
    let getWord = word_list[Math.floor(Math.random() * word_list.length)]
    getWord.len = getWord.word.length
    res.json({ ...getWord, word: '' })
})

app.get('/v2/word/:id/pos/:pos/sym/:sym', function (req, res) {
    console.log(req.params)
    const { id, pos, sym } = req.params
    word_list.forEach(item => {
        if (item.id == id) {
            console.log(item.id, id)
            console.log(item.word[pos], sym)
            if (item.word[pos] == sym) {
                res.json({ message: true })
            } else {
                res.json({ message: false })
            }
        }
    })
})

app.listen(3000, () => console.log(FgYellow + '[Gallow-Server]:' + FgGreen + ' Сервер запущен.'))