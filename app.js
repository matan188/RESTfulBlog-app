const express = require('express'),
app = express(),
mongoose = require('mongoose'),
bodyParser = require('body-parser'),
methodOverride = require('method-override');


// APP Configuration
mongoose.connect('mongodb://localhost/restful_blog', {useMongoClient: true});

app.set('view engine', 'ejs'); // Use EJS for templating
app.use(express.static('public')); // Path for Express to server static files
app.use(bodyParser.urlencoded({extended: true})); // Parse requests as JSON 
app.use(methodOverride('_method'));

// Mongoose: Blog model
var blogSchema = new mongoose.Schema({
    title: String, 
    image: String, 
    body: String, 
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model('Blog', blogSchema);

// ROUTES 

// Redirect root route to /blogs
app.get('/', (req, res) => {
    res.redirect('/blogs');
})

// INDEX route
app.get('/blogs', (req, res) => {
    Blog.find({}, (err, blogs) => {
        if (err) {
            console.log(err);
        } else {
            res.render('index', {blogs});
        }
    });
})

// NEW route
app.get('/blogs/new', (req, res) => {
    res.render('new');
})

// CREATE route
app.post('/blogs', (req, res) => {
    Blog.create(req.body.blog, (err, newBlog) => {
        if (err) {
            res.render('new');
        } else {
            res.redirect('/blogs');
        }
    });
});

// SHOW route
app.get('/blogs/:id', (req, res) => {
    Blog.findById(req.params.id, (err, foundBlog) => {
        if (err) {
            res.redirect('/blogs');
        } else {
            res.render('show', {blog: foundBlog});
        }
    })
})

// EDIT route 
app.get('/blogs/:id/edit', (req, res) => {
    Blog.findById(req.params.id, (err, foundBlog) => {
        if (err){
            res.redirect('/blogs');
        } else {
            res.render('edit', {blog: foundBlog});
        }
    });
});

// UPDATE route
app.put('/blogs/:id', (req, res) => {
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog) => {
        if (err) {
            res.redirect('/blogs');
        } else {
            res.redirect('/blogs/' + req.params.id);        
        }
    });
});

// DELETE route
app.delete('/blogs/:id', (req, res) => {
   Blog.findByIdAndRemove(req.params.id, (err) => {
       if (err) {
           res.redirect('/blogs');
       } else {
           res.redirect('/blogs');
       }
   });
});

// App port confifg
app.listen(3000, () => {
    console.log("Blog App running");
})