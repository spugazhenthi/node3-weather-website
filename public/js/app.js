console.log('Client script file is loaded')

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//      console.log(data)
//     })
// })


const getforecast = (address,callback) => {
    fetch('http://localhost:3000/weather?address='+address).then((response)=>{
    response.json().then((data)=>{
        if(data.error)
        {
            return callback(data.error,undefined)
            //return console.log(data.error)
        }

        callback(undefined,{
            location : data.location,
            forecast : data.forecast
        })
    })
})
}


const weatherform = document.querySelector('form')
const input = document.querySelector('input')

weatherform.addEventListener('submit',(e)=>{
   e.preventDefault()
   const searchText = input.value
   const message1Element = document.querySelector('#message-1')
   const message2Element = document.querySelector('#message-2')
   message1Element.textContent = 'Loading...'
   message2Element.textContent = ''
   getforecast(searchText,(error,response)=>{
       if(error)
       {
   message1Element.textContent = error; 
   message2Element.textContent = '';

           return console.log(error)
       }

       message1Element.textContent = JSON.stringify(response.forecast); 
   message2Element.textContent = response.location;
        console.log(response)
   })
})