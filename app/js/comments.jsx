const React = require('react');
const ReactDOM = require('react-dom');

const CommentBox = require('./comments/box');
require('./ajax.js');
require('../css/landing.css');

ReactDOM.render(
  <CommentBox url="/api/comments/" />,
  document.getElementById('content')
);
