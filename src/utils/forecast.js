

const request = require('postman-request');

const forecast = (latitude , longitude , callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=25babc9aa6d2261220df19e839e409ee&query='+latitude+','+longitude+'units=m';
    request({url : url , json : true},(error,{body}) => {
        if(error){
            callback('Connection lost !',undefined);
        }
        // else if (body.error){
        //     callback('There is no location like that !',undefined)
        // }
        else{
            callback(undefined,body)
        }
    })    
}

module.exports = forecast;