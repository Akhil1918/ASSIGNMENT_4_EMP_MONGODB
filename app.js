const express = require('express');
const app = express();

const morgan = require('morgan');
app.use(morgan('dev'));

require('dotenv').config();
require('./db/connection');

app.set('view engine', 'ejs');
app.set("views", __dirname + '/views');

app.use(express.static('Public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());// please dont forget the order here of this middle ware 


const nav = [
    { link: '/server/data', name: 'Home' }, 
    { link: '/server/form', name: 'Add Employee' }

];


const employeeroutes = require('./Router/server');
app.use('/server', employeeroutes(nav));




app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
