const request = require('request')

const geocode = (address,callback)=> {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoicHVnYXpoZ3ltMTIzIiwiYSI6ImNsMXl0ZTJvNTBmc3ozY21rYmQ3MnJmNnYifQ.JMF7ICMNiLnXTBR9VSwCvg&limit=1'
    request({url,json:true},(error,response)=>{
       if(error)
       {
           callback('Unable to connect the server',undefined)
       }
       else if( response.body.message || response.body.features.length === 0)
       {
           callback('Unable to find the location',undefined)
       }
       else
       {
           const langitude = response.body.features[0].center[0]
           const Latitude = response.body.features[0].center[1]
           const place = response.body.features[0].place_name
           const data = {
               latitude: Latitude,
               langitude : langitude,
               place : place
           }

           callback(undefined,data)
       }
    })
}

module.exports= {
    geocode
}