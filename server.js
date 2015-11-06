// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

// set view engine to hbs (handlebars)
app.set('view engine', 'hbs');

// connect to mongodb
mongoose.connect('mongodb://localhost/todo-app');

// require Todo model
var Todo = require('./models/todo');


// HOMEPAGE ROUTE

app.get('/', function (req, res) {
  res.render('index');
});


// API ROUTES

// get all todos
app.get('/api/todos', function (req, res) {
  // find all todos in db
  Todo.find(function (err, allTodos) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ todos: allTodos });
    }
  });
});

// create new todo
app.post('/api/todos', function (req, res) {
  // create new todo with form data (`req.body`)
  var newTodo = new Todo(req.body);

  // save new todo in db
  newTodo.save(function (err, savedTodo) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(savedTodo);
    }
  });
});

// get one todo
app.get('/api/todos/:id', function (req, res) {
  // get todo id from url params (`req.params`)
  var todoId = req.params.id;

  // find todo in db by id
  Todo.findOne({ _id: todoId }, function (err, foundTodo) {
    if (err) {
      if (err.name === "CastError") {
        this.status(404).json({ error: "Nothing found by this ID." });
      } else {
        this.status(500).json({ error: err.message });
      }
    } else {
      res.json(foundTodo);
    }
  });
});

// update todo
app.put('/api/todos/:id', function (req, res) {
  // get todo id from url params (`req.params`)
  var todoId = req.params.id;

  // find todo in db by id
  Todo.findOne({ _id: todoId }, function (err, foundTodo) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      // update the todos's attributes
      foundTodo.task = req.body.task;
      foundTodo.description = req.body.description;

      // save updated todo in db
      foundTodo.save(function (err, savedTodo) {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          res.json(savedTodo);
        }
      });
    }
  });
});

// delete todo
app.delete('/api/todos/:id', function (req, res) {
  // get todo id from url params (`req.params`)
  var todoId = req.params.id;

  // find todo in db by id and remove
  Todo.findOneAndRemove({ _id: todoId }, function (err, deletedTodo) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(deletedTodo);
    }
  });
});


// listen on port 3000
app.listen(3000, function() {
  console.log('server started');
});