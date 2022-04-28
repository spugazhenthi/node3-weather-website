const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocodeutils = require('./utils/geocode')
const forecastutils = require('./utils/forecast')

const app = express()

const options = {
    extensions : ['htm','html']
}

// Define paths for express config
const viewPath = path.join(__dirname,'../templates/views')

// set up handle bar engine views and location
app.set('view engine','hbs')
app.set('views',viewPath)

// setup static dir to serve
app.use(express.static(path.join(__dirname,'../public'),options))

// to register handlebars partials
hbs.registerPartials(path.join(__dirname,'../templates/partials'))

// app.com
// app.com/help
// app.com/about

app.get('',(req,res)=>{
    res.render('index',{
        title : 'Weather App',
        name : 'This is footer'
    })
})

// app.get('',(req,res)=>{
//      res.send('Hello express !')
// })


app.get('/help',(req,res)=>{
    res.render('help',{
        message : 'This is test website',
        title : 'Help',
        name : 'This is footer'
    })
})

// app.get('/help',(req,res)=>{
//     res.sendFile(path.join(__dirname,'../public/help.html'))
// })

// app.get('/help',(req,res)=>{
//     res.send([{
//         name:'pugazh',
//         age:33
//     },
//     {
//      name:'enthi',
//      age:33
//  }
//  ])
// })


// app.get('/about',(req,res)=>{
//    res.sendFile(path.join(__dirname,'../public/about.html'))
// })

app.get('/about',(req,res)=>{
    res.render('about',{
        title : 'About Me',
        name : 'This is footer'
    })
})

// app.get('/about',(req,res)=>{
//    res.send('<h1> About </h1>')
// })

app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error : 'please provide address'
        })
    }
 
    geocodeutils.geocode(req.query.address,(geocodeerror,{latitude,longitude,place}={})=> {
        if(geocodeerror)
        {
            return res.send({
                error : geocodeerror
            })
        }
         forecastutils.getforecast(latitude,longitude,(forecasterror,forecastresponse)=>{
             if(forecasterror)
             {
                return res.send({
                    error : forecasterror
                })
             }

             return res.send({
                forecast: forecastresponse,
                location : place,
                address : req.query.address
            })
         })
        
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search)
    {
        return res.send({
            errormessage : 'Please provide search string'
        })
    }

    res.send({
        products : []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404page',{
        title : 'Not Found',
        name : 'This is footer',
        errormessage : 'Help articles not found'
   })
})

app.get('*',(req,res)=>{
   res.render('404page',{
       title : 'Not Found 404',
       name : 'This is footer',
        errormessage : 'Page  not Found'
   })
})

app.listen(3000,()=>{
    console.log('server is up and running on port 3000')
})