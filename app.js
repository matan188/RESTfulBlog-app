const express = require('express'),
app = express(),
mongoose = require('mongoose'),
bodyParser = require('body-parser');


// APP Configuration
mongoose.connect('mongodb://localhost/restful_blog', {useMongoClient: true});

app.set('view engine', 'ejs'); // Use EJS for templating
app.use(express.static('public')); // Path for Express to server static files
app.use(bodyParser.urlencoded({extended: true})); // Parse requests as JSON 

// Mongoose: Blog model
var blogSchema = new mongoose.Schema({
    title: String, 
    image: String, 
    body: String, 
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model('Blog', blogSchema);


app.listen(3000, () => {
    console.log("Blog App running");
})