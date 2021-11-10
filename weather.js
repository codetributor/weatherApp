const api  = require('./api.json');
const https = require('https');
const http = require('http')

//print error
function printError(error) {
    console.error(error.message)
}

//print out the details
function printWeather(weather) {
    const message = `The tempurature in ${weather.name} is ${weather.main.temp}`;
    console.log(message);
}

function get(query) {

    
    const request = 
https.get(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${api.key}`,
            response => {
            if(response.statusCode === 200) {
            let body = "";
            response.on('data', chunk => {
                body += chunk;
            })
            
            response.on('end', () => {
                try {
                let weather = JSON.parse(body);
                printWeather(weather);
                } catch(error) {
                    printError(error);
                }
            })
        } else {
            console.error(`Something went wrong: ${http.STATUS_CODES[response.statusCode]}`)
        }
            
    })
    request.on('error', printError)
}


module.exports.get = get;