
const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const mustacheExpress = require('mustache-express')
const PORT = 4000

let trips = []


app.use(express.static('css'))


// this adds the ability to parse the body
app.use(bodyParser.urlencoded({ extended: false }))

// setting the templating engine as mustache
app.engine('mustache',mustacheExpress())
// telling express that all the views (pages) will be inside
// views directory
app.set('views','./views')
// set the view engine to mustache
app.set('view engine','mustache')

// localhost:3000
app.get('/',function(req,res){
  res.render('index')
})

app.post('/delete-trip',function(req,res){

    let cityName = req.body.cityName
    // console.log(cityName)

    trips = trips.filter(function(trip){
      return trip.cityName != cityName
    })

    res.redirect('/trips')
})

app.post('/addtrip',function(req,res){

  let cityName = req.body.cityName
  let imgURL = req.body.imgURL
  let dateDeparture = req.body.dateDeparture
  let dateReturn = req.body.dateReturn

  trips.push({cityName : cityName, imgURL : imgURL, dateDeparture : dateDeparture, dateReturn : dateReturn})

  res.redirect('/trips')
})

app.get("/addtrip",function(req,res){
  res.render("addtrip")
})

app.get('/trips',(req,res) => {

  res.render('trips',{ tripList : trips })
})

app.listen(PORT,function(){
  console.log("Server is running...")
})
