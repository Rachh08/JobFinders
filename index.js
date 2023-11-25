var express = require('express');
var bodyParser = require("body-parser");
var app = express();

const PORT = process.env.PORT || 5050
var startPage = "index.html";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("./public"));

const { JobFilter } = require('./utils/JobSearchUtil')
app.get('/filterJobs', JobFilter);

const { register } = require('./utils/UserUtil');
const { JobSearch } = require('./models/JobSearch');
app.post('/register', register);

app.get('/search', (req, res) => { 
    const query = req.query.q; 
    const results = JobSearch(query); 
    res.json({ results });
});

const { login } = require('./utils/UserUtil')
app.post('/login', login);

const { viewJobs } = require('./utils/JobsUtil')
app.get('/view-jobs', viewJobs);

const { updateUserdetails } = require('./utils/UserUtil')
app.post('/update-userdetails', updateUserdetails);

const { searchJobs } = require('./utils/JobSearchUtil')
app.post('/search', searchJobs);

const { register } = require('./utils/UserUtil')
app.post('/register', register); 

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/" + startPage);
})

app.listen(PORT, function () {

    console.log(`Demo project at: ${PORT}!`);
});


