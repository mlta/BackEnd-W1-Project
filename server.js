const fs = require("fs")
const express = require("express")
const mustacheExpress = require("mustache-express")
const expressValidator = require("express-validator")
const bodyParser = require("body-parser")
const app = express()
const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n")

//console.log(words)
app.engine("mustache", mustacheExpress())
app.set("views", "./views")
app.set("view engine", "mustache")

app.use(express.static("public"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressValidator())

const lettersthatuserguessed = []
const randomWord = words[Math.floor(Math.random() * words.length)]
console.log(randomWord)

// console.log(Math.floor(Math.random() * words.length))
// console.log(words[Math.floor(Math.random() * words.length)])

app.get("/", (request, response) => {
  let conversionUnderscores = []

  for (let i = 0; i < randomWord.length; i++) {
    const letter = randomWord[i]
    if (lettersthatuserguessed.includes(letter)) {
      conversionUnderscores.push(letter)
    } else {
      conversionUnderscores.push("_")
    }
  }

  const lettersfound = conversionUnderscores.join("")
  response.render("home", { lettersfound, lettersthatuserguessed })
})
// only to store it.
const guesseleft = 8
if (lettersthatuserguessed) {
}

app.post("/", (request, response) => {
  const storeletter = request.body.letter

  // Maria changes the code that says "false" to something dynamic
  // that determins if `storeletter` has already been guessed.
  const letterAlreadyGuessed = false
  if (!letterAlreadyGuessed) {
    lettersthatuserguessed.push(storeletter)
  }
  // Otherwise, nothing

  response.redirect("/")
})

//app.post("/", (request, response) => {
//const letterssplit = randomWord.split("")
//console.log(letterssplit)
// response.render("home")
//})

app.listen(3000, () => {
  console.log("Funciona")
})
