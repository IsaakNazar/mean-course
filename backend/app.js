const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();
const uri = 'mongodb+srv://user_001:VVFkTptXZ68s5LWw@sandbox-0rmzk.mongodb.net/node_angular?retryWrites=true&w=majority';

mongoose.connect(uri, {useNewUrlParser: true})
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch(() => {
    console.log('something wrong happened');
  });

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS'
  );
  next();
});


app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: 'Post added successfully',
      postId: createdPost._id
    })
  });
});

app.put('/api/posts/:id', (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({_id: req.params.id}, post).then(result => {
    console.log('result', result);
    res.status(200).json({
      message: 'Post Updated successfully!'
    });
  });
});

app.get('/api/posts', (req, res, next) => {
  Post.find().then(documents => {
    res.status(200).json({
      message: 'Posts fetched successfully',
      posts: documents
    });
  });
});

app.delete('/api/posts/:id', (req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log('result', result);
    res.status(200).json({
      message: 'Post deleted!'
    });
  })

});

module.exports = app;

// VVFkTptXZ68s5LWw
