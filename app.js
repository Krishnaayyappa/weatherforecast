const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const https = require("https");
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){
  const cityname = req.body.cityname
  const appid = "4cc2b59a4f2b9264be379c749fbc125e"
  const units = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+cityname+"&appid="+appid+"&units="+units;
  https.get(url, function(response){
    response.on("data", function(data){
      const weatherdata = JSON.parse(data);
      // console.log(weatherdata);
      if(weatherdata.cod == '404'){
        res.send("city not found")
      }else {
        const temp = weatherdata.main.temp;
        const description = weatherdata.weather[0].description;
        const icon = weatherdata.weather[0].icon;
        const imgurl = "http://openweathermap.org/img/wn/"+ icon + "@2x.png";
        res.write("<h1>Temperature: " + temp +" degrees celsius</h1>");
        res.write("<h3>" + description + "</h3>");
        res.write("<img src =" + imgurl + ">");
        res.send();
      }

    });
  });

});






app.listen(3000,function(){
  console.log("server started on port 3000")
});
