const fs = require("fs")
const express = require("express")
const mustacheExpress = require("mustache-express")
const expressValidator = require("express-validator")
const bodyParser = require("body-parser")
const lettersthatuserguessed = []
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

const randomWord = words[Math.floor(Math.random() * words.length)]
console.log(Math.floor(Math.random() * words.length))
console.log(words[Math.floor(Math.random() * words.length)])

app.get("/", (request, response) => {
  let conversionUnderscores = []
  console.log(randomWord)
  //   for (var i = 0; i < randomWord.length; i++) {
  //    if(/*checn if the the current letter of the randomWord has been used*/)
  //     conversionUnderscores.push(" _ ")
  //   }

  //console.log(conversionUnderscores)
  let lettersfound = conversionUnderscores.join("")
  //
  response.render("home", { lettersfound })
})
// only to store it.
app.post("/", (request, response) => {
  const storeletter = request.body.letter
  lettersthatuserguessed.push(storeletter)
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
