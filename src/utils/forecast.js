const request = require("request");

const getforecast = (latitude,langitude,callback)=>{
  const url = 'http://api.weatherstack.com/current?access_key=a48c0f6e084d0dabf140094bcb6f1c7a&query='+latitude+','+langitude+'&units=f'
  request({url,json:true},(error,response)=>{
    if(error)
    {
       callback('unable to connect the server',undefined)
    }
    else if(response.body.error)
    {
      callback('Unable to find the location',undefined)
    }
  else
  {
      const data = {
          temperature : response.body.current.temperature,
          description : response.body.current.weather_descriptions[0],
          feelslike : response.body.current.feelslike        
      }
      
      callback(undefined,data)
  }  
  })
}

module.exports={
  getforecast : getforecast
}
