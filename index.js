var express = require('express');
var bodyParser = require("body-parser");
var app = express();
const logger = require('./logger');

const PORT = process.env.PORT || 5055
var startPage = "index.html";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("./public"));

//Enable CORS for all routes
app.use((req, res, next) => {
    const allowedOrigin = req.headers.origin;

    res.header('Access-Control-Allow-Origin', allowedOrigin);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
});

const { register } = require('./utils/UserUtil');
app.post('/register', register);

const { login } = require('./utils/UserUtil')
app.post('/login', login);

const { addJobs } = require('./utils/JobsUtil')
app.post('/add-job', addJobs);

const { viewJobs } = require('./utils/JobsUtil')
app.get('/view', viewJobs);

const { searchJobs } = require('./utils/JobsUtil')
app.post('/search-jobs', searchJobs);

const { updateUser } = require('./utils/UserUtil')
app.put('/updateuser/:id', updateUser);

const { deleteUser } = require('./utils/UserUtil')
app.delete('/delete-user/:name', deleteUser);

const { viewUser } = require('./utils/UserUtil')
app.get('/view-user', viewUser);

const statusMonitor = require('express-status-monitor');
app.use(statusMonitor());

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/" + startPage);
})

const server = app.listen(PORT, function () {

    console.log(`Demo project at: ${PORT}!`);
    logger.info(`Demo project at: ${PORT}!`);
    logger.error(`Example or error log`)
});

module.exports = { app, server }

