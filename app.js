const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
require('dotenv').config();
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req, res){

  res.sendFile(__dirname + "/index.html");
})
app.post("/",function(req,res){
  const query = req.body.cityName;
  const unit = "metric";
  const apiKey = process.env.API_KEY;
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey +"&units="+unit;
  https.get(url, function(response){
    console.log("statusCode: "+response.statusCode);

    response.on("data", function(data){
      const weatherData =  JSON.parse(data);
      const temp  = weatherData.main.temp;
      const desc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imgUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<p> the weather description is: "+ desc +"</p>");
      res.write("<h1> the temp in " + query + " is: "+ temp +"</h1>");
      res.write("<img src=" + imgUrl +">");
      res.send();
    //   console.log("temp: " +temp);
    //   console.log("description: "+ desc);
     })
  })
})


// res.send("Server is up and running");
app.listen(3000,function(){
  console.log("Server is running on port 3000.");
})
