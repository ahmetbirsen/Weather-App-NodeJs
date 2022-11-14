const request = require('postman-request');

const geocode = (address , callback) => {
    
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYWhtZXRiaXJzZW4iLCJhIjoiY2w5b2luOTQzMGkxczNua2J3d3oybzE3biJ9.ZtGQyLsb_VdfbDQpmj6Tqg';
    request({url : url , json: true },(error , {body}) => {
        if(error){
            callback('Connection lost !',undefined);
         }else if(body.features.length === 0){
             callback("We couldn't find a location . Please try different location",undefined );
         }
        else{
            callback(undefined,{
                 'latitude':body.features[0].center[1],
                 'longitude':body.features[0].center[0],
                 'location':body.features[0].place_name
                
            })
        }
    })
}

module.exports = geocode;
