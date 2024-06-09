const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const thePageFile = "C:/Users/admin/Desktop/web Practice #100dev/repos/BooksCollection/index.html"
const connectionString = "mongodb+srv://vincinchristmas:7yyZ7JMjYlQnPNu4@cluster0.hbyhco3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const app = express()

//7yyZ7JMjYlQnPNu4

  MongoClient.connect(connectionString)
  .then(client => {
    console.log('Connected to Database')

    const db = client.db('my-favorite-books')
    const booksCollection = db.collection('books')

    app.set('view engine', 'ejs')
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(express.static('public'))
    app.use(bodyParser.json())
    app.get('/', (req, res) => {
        const cursor = db.collection('books').find()
        .toArray()
        .then(results => {
            res.render('index.ejs', {books: results})
        })
        .catch(error => console.error(error)) 
  })
    app.post('/books', (req, res) => {
        booksCollection
        .insertOne(req.body)
        .then(result => {
            res.redirect('/')
        })
        .catch(error => console.error(error))
  })

  app.put('/books', (req, res) => {
    booksCollection.findOneAndUpdate(
        { author: 'Napolean Hill' },
        {
          $set: {
            author: req.body.author,
            book: req.body.book,
          },
        },
        {
          upsert: true,
        }
      )
      .then(result => {
        res.json('Success')
      })
      .catch(error => console.error(error))
  })

    app.delete('/books', (req, res) => {
        booksCollection
    .deleteOne({ author: req.body.author })
    .then(result => {
        if (result.deletedCount === 0) {
            return res.json('No books to delete')
          }
      res.json(`Deleted one book`)
    })
    
    .catch(error => console.error(error))
    
  })

    app.listen(3000, function () {
    console.log('listening on 3000')
  })
  })
  .catch(console.error)

  




  

console.log('May Node be with you')