// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

// set view engine to ejs
// app.set('view engine', 'ejs');

// our "database" is an array for now
var todos = [];


// API ROUTES

// get all todos
app.get('/todos', function (req, res) {
  res.json({ todos: todos });
});

// create new todo
app.post('/todos', function (req, res) {
  var newTodo = req.body;
  todos.push(newTodo);
  res.json(newTodo);
});

// get one todo
app.get('/todos/:id', function (req, res) {
  var todoId = req.params.id;
  var todo = todos.filter(function (todo) {
    return todo.id == todoId;
  })[0];
  res.json(todo);
});

// update todo
app.put('/todos/:id', function (req, res) {
  var todoId = req.params.id;
  var todo = todos.filter(function (todo) {
    return todo.id == todoId;
  })[0];
  var updatedTodo = req.body;
  todos.splice(todos.indexOf(todo), 1, updatedTodo);
  res.json(updatedTodo);
});

// delete todo
app.delete('/todos/:id', function (req, res) {
  var todoId = req.params.id;
  var todo = todos.filter(function (todo) {
    return todo.id == todoId;
  })[0];
  todos.splice(todos.indexOf(todo), 1);
  res.json(todo);
});

// listen on port 3000
app.listen(3000, function() {
  console.log('server started');
});