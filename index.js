const express = require('express')
const { v4: uuid } = require('uuid')

class Book {
  constructor(title = '', description = '', authors = '', favorite ='',  fileCover = '', fileName = '', id = uuid()) {
    this.title = title
    this.description = description
    this.authors     = authors
    this.favorite    = favorite
    this.fileCover   = fileCover
    this.fileName    = fileName
    this.id          = id
  }
}

const books = {
  book: [
    new Book('Властелин Колец', 'Сказания о Средиземье — это хроника Великой войны за Кольцо, войны, длившейся не одну тысячу лет.', 'Дж. Р. Р. Толкин', ),
    new Book('Мастер и Маргарита', 'Сатана правит бал в сталинской Москве, Маргарита мстит литературным критикам, тьма накрывает ненавидимый прокуратором город.', 'Михаил Булгаков', ),
    new Book('Первому игроку приготовиться', 'В 2045 году реальный мир – не самое приятное место. По-настоящему живым Уэйд Уоттс чувствует себя лишь в OASISе – огромном виртуальном пространстве, где проводит свои дни большая часть человечества.', 'Эрнест Клайн', ),
    new Book('Рождение Орды', 'Хотя молодой вождь Тралл и покончил с проклятием демона, которое многие поколения оскверняло его народ, орки все еще пытаются побороть грехи своего кровавого прошлого.', 'Кристи Голден', ),
  ],
}

const app = express()
app.use(express.json())

app.post('/api/user/login', (req, res) => {


    res.status(201)
    res.json({ id: 1, mail: "test@mail.ru" })
  })

app.get('/api/books', (req, res) => {
  const {book} = books
  res.json(book)
})

app.get('/api/books/:id', (req, res) => {
  const {book} = books
  const {id} = req.params
  const idx = book.findIndex(el => el.id === id)

  if( idx !== -1) {
    res.json(book[idx])
  } else {
    res.status(404)
    res.json('404 | страница не найдена')
  }

})

app.post('/api/books/', (req, res) => {

  const {book} = books
  const {title, description, authors, favorite, fileCover, fileName} = req.body

  const newBook = new Book(title, description, authors, favorite, fileCover, fileName)
  book.push(newBook)

  res.status(201)
  res.json(newBook)
})

app.put('/api/books/:id', (req, res) => {
  const {book} = books
  const {title, description, authors, favorite, fileCover, fileName} = req.body
  const {id} = req.params
  const idx = book.findIndex(el => el.id === id)

  if (idx !== -1){
    book[idx] = {
      ...book[idx],
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName,
    }

    res.json(book[idx])
  } else {
    res.status(404)
    res.json('404 | страница не найдена')
  }
})

app.delete('/api/books/:id', (req, res) => {
  const {book} = books
  const {id} = req.params
  const idx = book.findIndex(el => el.id === id)

  if(idx !== -1){
    book.splice(idx, 1)
    res.json(true)
  } else {
    res.status(404)
    res.json('404 | страница не найдена')
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT)