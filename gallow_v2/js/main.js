let btn_start = document.querySelector('#btn_start')
let btn_finish = document.querySelector('#btn_finish')
let game_detail = document.querySelector('.game_detail')
let detail_desc = game_detail.querySelector('.statics .discription')
let detail_word = game_detail.querySelector('.statics .word')

// game_status - отвечает за текущий игровой статус в игре.
let game_status = {
    win() {
        document.querySelector('.game_table .status').innerHTML = 'Вы выиграли.'
    },
    lose(word) {
        document.querySelector('.game_table .status').innerHTML = '<span style="color:red;">Вы проиграли.</span><br>Слово было: ' + word + '</br>'
    },
    start() {
        document.querySelector('.game_table .status').innerHTML = ''
    },
    finish() {
        document.querySelector('.game_table .status').innerHTML = 'Игра завершена.'
    }
}

/*
game_body - отвечает за тело висельника, кости по порядку
веревка,голова,тело,левая-рука,правая-рука,левая-нога,правая-нога
*/
let game_body = [
    document.querySelector('.rope'),
    document.querySelector('.head'),
    document.querySelector('.body'),
    document.querySelector('.left_hand'),
    document.querySelector('.right_hand'),
    document.querySelector('.left_foot'),
    document.querySelector('.right_foot')
]

let errorCount = 0
let answer = 0

/*
list_words - отвечает за варианты слов и их описание
можно добавлять свои варианты в виде обьектов
*/
let list_words = [
    {
        desc: "Это что то плавающее",
        word: "лодка"
    }
]

btn_start.addEventListener('click', startGame)
btn_finish.addEventListener('click', finishGame)

/**
 * startGame - запускает игру.
 * обнуляет все переменные и удаляет тело висельника
 */
function startGame() {
    game_status.start()
    errorCount = 0
    answer = 0
    setWord()

    // удаляет тело при старте игры
    game_body.forEach((item) => {
        item.style.display = "none"
    })
    btn_start.style.display = "none"
    btn_finish.style.display = "block"
}

/**
 * finishGame - заканчивает игру,
 * очищает поля description и word в блоке statics
 */
function finishGame() {
    // game_status.finish()
    detail_desc.innerHTML = ''
    detail_word.innerHTML = ''

    game_body.forEach((item) => {
        item.style.display = "block"
    })

    btn_start.style.display = "block"
    btn_finish.style.display = "none"
}

/**
 * setWord - устанавливает игровое слово,
 * и устанавливает описание
 */
async function setWord() {
    fetch('word')
        .then(res => res.json())
        .then(data => {
            detail_desc.innerHTML = data.desc
            // добавляет кнопки 
            for (let i = 0; i < data.len; i++) {
                let btn = document.createElement('button')
                btn.setAttribute('id', i)
                btn.addEventListener('click', (e) => {
                    checkWord(e.target, data.len)
                })
                btn.innerHTML = "X"
                detail_word.appendChild(btn)
            }
        })
}

/**
 * checkWord - проверяет введеную букву
 * обновляет статус игры
 */
async function checkWord(target, len) {

    let id = target.id

    let getLet = prompt('Введите букву').toLocaleLowerCase()
    fetch('pos/' + id + '/sym/' + getLet[0])
        .then(res => res.json())
        .then(data => {
            switch (data.message) {
                case "answer": {
                    target.innerHTML = getLet[0]
                    answer = data.answer
                } break
                case "error": {
                    game_body[errorCount].style.display = "block"
                    errorCount = data.error
                } break
                case "win": {
                    finishGame()
                    game_status.win()
                } break
                case "lose": {
                    finishGame()
                    game_status.lose()
                } break
            }
            console.log("Длина слова: ", len,
                "\nКоличество ошибок:", errorCount, "из", game_body.length,
                "\nКоличество правильных:", answer, "из", len)
        })

}