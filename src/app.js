const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('../src/utils/forecast');
const geocode = require('../src/utils/geocode');

const app = express();
const port = process.env.PORT || 3000;
0
//Declare path for config Express
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engines and views location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('',(req,res) => {
    res.render('index',{
        title : 'Home Page!',
        name : 'Ahmet Birsen'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title : 'Help Page..',
        message : 'Undefined parameter !!',
        name : 'Ahmet Birsen'
    })
})


app.get('/weather' , (req,res) => {
    let address = req.query.address;
    if(!address){
       return res.send({
            error:'You must enter addres info',
            data : null
        })
    }
    
    geocode(address,(error, { latitude , longitude , location } = {} /* declared default value (destructuring) to prevent crash program */) => {
        if(error){
            return res.send({
                error:error,
                data : null
            })
        }
    
        forecast(latitude,longitude , (error, forecastData) => {
            if(error){
                return res.send({
                    error:error,
                    data : null
                })
            }
            console.log(location);
            console.log(forecastData);
            res.send({
                forecast : 'Degree :'+forecastData.current.temperature,
                forecastWind : forecastData.wind_speed,
                forecastCode : forecastData.current.weather_descriptions[0],
                location : location
            });
          });
    })

    console.log("RESSS : ",res.forecastImage);
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        errorMessage : 'Sorry :( No found help article ..'
    });
})

app.get('*',(req,res) => {
    res.render('404',{
        errorMessage : '404 Page Not Found !'
    })
})

app.listen(port,  () => {
    console.log('Server is up on port '+port);
})