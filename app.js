var express = require('express');
var app = express();
var axios = require('axios');
const { render } = require('express/lib/response');

app.use('/static',express.static('public'));
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");

app.get('/', function(req,res){
  var num = Math.floor(Math.random() * 2682) + 1
  axios.get("https://xkcd.com/"+num+"/info.0.json").then(function (response){
    // handle success
    res.render('index.ejs', {title: response.data.safe_title, date: response.data.month+'/'+response.data.day+'/'+response.data.year,image: response.data.img, alt: response.data.alt, transcript: response.data.transcript});
  }) .catch(function (error) {
    // handle error
    console.log(error);
  })

})

app.listen(3000,function(){
  console.log('App listening on port 3000');
})

// :D