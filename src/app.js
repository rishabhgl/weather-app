const path = require('path');

const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const assets = path.join(__dirname, '../public');
const viewTemplates = path.join(__dirname, '../templates/views');
const partialTemplates = path.join(__dirname, '../templates/partials');
const app = express();

app.set('view engine', 'hbs');
app.set('views', viewTemplates);
hbs.registerPartials(partialTemplates);
app.use(express.static(assets, { extensions: ['html'] }));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Home Page',
        message: 'Welcome to my first express.js based web application!',
        name: 'Rishabh Goyal'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        message: 'Welcome! This is where you can learn more about us.',
        name: 'Rishabh Goyal'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        message: 'Looking for some help? You have come to the right place.',
        name: 'Rishabh Goyal'
    })
})

app.get('/weather', (req, res) => {
    const target = req.query.address;
    if (!target){
        res.send({
            error: "Error! Please provide a address for forecast!"
        });
        return;
    }
    geocode(target, (geoError, geoResponse) => {
        if(geoError){
            res.send({
                error: geoError
            });
            return;
        } 
        forecast(geoResponse, (forecastError, forecast) => {
            if(forecastError){
                res.send({
                    error: forecastError
                });
                return;
            }
            res.send({
                forecast,
                location: geoResponse.name,
                address: target
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404 Page',
        message: 'Help article not found!',
        name: 'Rishabh Goyal'
    })
})
app.get('*', (req, res) => {
    res.render('error', {
        title: '404 Page',
        message: 'Page not found!',
        name: 'Rishabh Goyal'
    })
})

app.listen(process.env.PORT || 3000, () => {
    console.log('Server running');
})