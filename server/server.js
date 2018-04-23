const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config/config').get(process.env.NODE_ENV);
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE);

const User = require('./models/user');
const Book = require('./models/book');
const auth = require('./middleware/auth');

app.use(bodyParser.json());
app.use(cookieParser());

// ------ GET ------ //
// Get Auth Check
app.get('/api/auth', auth, (req, res) => {
  res.json({
    isAuth: true,
    id: req.user._id,
    email: req.user.email,
    firstname: req.user.firstname,
    lastname: req.user.lastname
  });
});

app.get('/api/logout', auth, (req, res) => {
  req.user.deleteToken(req.token, (err, user) => {
    if (err) return res.status(400).send(err);
    res.sendStatus(200);
  });
});

// Get One Book
app.get('/api/book', (req, res) => {
  let id = req.query.id;
  Book.findById(id, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.send(doc);
  });
});

// Get Many Books
app.get('/api/books', (req, res) => {
  // localhost:3001/api/books?skip=3&limit=2&order=asc
  let skip = parseInt(req.query.skip);
  let limit = parseInt(req.query.limit);
  let order = req.query.order;

  Book.find()
    .skip(skip)
    .sort({ _id: order })
    .limit(limit)
    .exec((err, doc) => {
      if (err) return res.status(400).send(err);
      res.send(doc);
    });
});

// Get Reviewer
app.get('/api/reviewer', (req, res) => {
  let id = req.query.id;
  User.findById(id, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.json({
      firstname: doc.firstname,
      lastname: doc.lastname
    });
  });
});

// Get User
app.get('/api/users', (req, res) => {
  User.find({}, (err, users) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ users });
  });
});

// Get User/Reviewer's Posts
app.get('/api/user_posts', (req, res) => {
  Book.find({ ownerId: req.query.user }).exec((err, docs) => {
    if (err) return res.status(400).send(err);
    res.send(docs);
  });
});

// ------ POST ------ //
// Create One Book
app.post('/api/book', (req, res) => {
  const book = new Book(req.body);
  book.save((err, doc) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({
      post: true,
      bookId: doc._id
    });
  });
});

// Register User
app.post('/api/register', (req, res) => {
  const user = new User(req.body);
  user.save((err, doc) => {
    if (err) return res.status(400).json({ success: false });
    res.status(200).json({
      success: true,
      user: doc
    });
  });
});

// Login User
app.post('/api/login', (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        isAuth: false,
        message: 'Auth Failed: Email Not Found'
      });
    }
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          isAuth: false,
          message: 'Wrong Password'
        });
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie('auth', user.token).json({
          isAuth: true,
          id: user._id,
          email: user.email
        });
      });
    });
  });
});

// ------ UPDATE ------ //
// Update One Book
app.post('/api/book_update', (req, res) => {
  Book.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.json({
      success: true,
      doc
    });
  });
});

// ------ DELETE ------ //
// Delete One Book
app.delete('/api/delete_book', (req, res) => {
  let id = req.query.id;
  Book.findByIdAndRemove(id, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.json(true);
  });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});

// refactor routes later (reference yelpCamp routes)
