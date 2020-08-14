console.clear();


const express = require('express');
const app = express();
const port = 4000;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');      

    if ('OPTIONS' == req.method) {
      res.status(200).end();
    }
    else {
      next();
    }

});


const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use( (req,res,next)=> {
    if(req.originalUrl=='/favicon.ico') {
        next();
    }
    else {
        console.clear();
        console.log('>',req.method,req.originalUrl);
        if(Object.entries(req.body).length) {
            console.log('Posted:');
            console.log(req.body);
            console.log("\n");
        }
        next();
    }
});              

const cloudflareController = require('./controllers/cloudflare_controller');


app.use('/cloudflare',cloudflareController);


app.use('**',(req,res)=>{
    console.log('request Unknown');
    res.status(404).end('404 bed request');
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })