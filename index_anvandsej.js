// Declare our dependencies
var express = require('express');
var request = require('superagent');

// Create our express app
var app = express();

// Set the view engine to use EJS as well as set the default views directory
app.set('view engine', 'ejs');
app.set('views', __dirname + '/public/views/');

// This tells Express out of which directory to serve static assets like CSS and images
app.use(express.static(__dirname + '/public'));


// The homepage route of our application 
app.get('/', function(req, res){
  res.render('index');
})

//Show the queue. Calls the api for a queue-object. Renders the queue-page. 
app.get('/queue', function(req, res){
  request
    .get('localhost:3000/api/queue')
    .end(function(err, data) {
      if(data.status == 403){
        res.send(403, '403 Forbidden');
      } else {
        var d = data.body;
        res.render('queue', {queue : d} );
      }
    })
})


//Show the search function. Renders the search-page. 
app.get('/search', function(req, res){
  var url = 'localhost:3000/api/queue/search';
  if (req.query.q && req.query.q != 'undefined'){
    url += req.query.q;
  }
  
  request
    .get(url)
    .end(function(err, data) {
      console.log(err + "tje");
      console.log("whops")
      if(data.status == 403){
        res.send(403, '403 Forbidden');
      } else {
        var d = data.body;
        res.render('search', {searchdata : d});
      }
    })
})






//API

// Bring in our dependencies
const routes = require('./routes');


//  Connect all our routes to our application
app.use('/api', routes);



// Website will listen on port 3000. Feel free to change this as you see fit, just know that you can’t have multiple processes listening on the same port.
app.listen(3000);