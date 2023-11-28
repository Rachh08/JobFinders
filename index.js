var express = require('express');
var bodyParser = require("body-parser");
var app = express();

const PORT = process.env.PORT || 5055
var startPage = "index.html";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("./public"));



const { register } = require('./utils/UserUtil');
app.post('/register', register);

// const { login } = require('./utils/UserUtil')
// app.post('/login', login);

// const { addJobs } = require('./utils/JobsUtil')
// app.post('/add-job', addJobs);

// const { viewJobs } = require('./utils/JobsUtil')
// app.get('/view', viewJobs);

const { searchJobs } = require('./utils/JobsUtil')
app.post('/search-jobs', searchJobs);

// const { updateUser } = require('./utils/UserUtil')
// app.put('/updateuser/:id', updateUser);

// const { deleteUser } = require('./utils/UserUtil')
// app.delete('/delete-user/:name', deleteUser);

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/" + startPage);
})

app.listen(PORT, function () {

    console.log(`Demo project at: ${PORT}!`);
});


