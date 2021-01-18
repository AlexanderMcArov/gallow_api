const express = require('express')
const session = require('express-session');
const cors = require("cors")

const { FgYellow, FgGreen } = require('./colors')
const { word_list } = require('./data');

const app = express()

app.set('port', (process.env.PORT || 3000));
app.use(cors())
app.use('/', express.static('gallow'))
app.use('/v2', express.static('gallow_v2'))

app.use(session({
    secret: 'keyboard cat',
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: true
}))

// Access the session as req.session

app.get('/v2/word', function (req, res) {
    const index = Math.floor(Math.random() * word_list.length)
    let getWord = word_list[index]
    req.session.id.wordid = index
    req.session.id.answer = 0
    req.session.id.error = 0
    res.json({ desc: getWord.desc, len: getWord.word.length })
})

app.get('/v2/pos/:pos/sym/:sym', function (req, res) {
    console.log(req.params)
    const { pos, sym } = req.params
    let word = word_list[req.session.id.wordid]
    if (word.word[pos] == sym) {
        req.session.id.answer++
        if (req.session.id.answer == word.word.length) res.json({ message: 'win', answer: word.word.length, sym: sym })
        res.json({ message: 'answer', answer: req.session.id.answer })
    } else {
        req.session.id.error++
        if (req.session.id.error == 7) res.json({ message: 'lose', error: 7 })
        res.json({ message: 'error', error: req.session.id.error })
    }
})

app.listen(app.get('port'), () => console.log(FgYellow + '[Gallow-Server]:' + FgGreen + ' Сервер запущен.'))