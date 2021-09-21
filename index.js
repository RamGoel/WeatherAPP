const request = require('request');
const argv = require('yargs').argv;
const express=require('express')
const app=express();
const contentType=require('content-type')
const ejs = require('ejs')
const bodyParser=require('body-parser')
const path=require('path');
const fs = require('fs')
const http = require('http');
const port=  process.env.PORT || 3000;





app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(path.join(__dirname ,'views')));
app.set('view engine', 'ejs');


app.get('/', (req,res)=>{
  res.render('index')
})

app.post('/weather', (req,res)=>{
  const city1=req.body.city;
  let apiKey = '93e5c85b58054abfb3c154415210708';
    let city = city1 || 'portland';
    let url = `http://api.weatherapi.com/v1/current.json?q=${city}&key=${apiKey}`
  request(url, function (err, response, body) {
    
    if(err){
      console.log('error:', error);
    } else {
      let weather = JSON.parse(body)
      console.log(weather)
      let message = `It's ${weather.current.temp_c} degrees in ${weather.location.name}!`;
      res.render('weather', {City:weather.location.name, Weather:weather.current.temp_c, Region: weather.location.region, Country:weather.location.country, latitude:weather.location.lat, longitude:weather.location.lon , time : weather.location.localtime})
    }
  });
})

app.listen(port, () => {
  console.log('App listening on port 3000!');
});