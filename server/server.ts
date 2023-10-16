const { expressCspHeader, INLINE, NONE, SELF } = require('express-csp-header');const express = require('express');
const path = require('path');
const cors = require('cors')
const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors())
app.use(expressCspHeader({
  directives: {
      'default-src': [SELF],
      'script-src': [SELF, INLINE, 'somehost.com'],
      'style-src': [SELF, 'mystyles.net'],
      'img-src': ['data:', 'images.com'],
      'worker-src': [NONE],
      'block-all-mixed-content': true
  }
}));


// let todos = { "My great todo list": [] }




console.log("init server...")
// console.log(express.static(path.join(__dirname, 'build')))
app.use(express.static(path.join(__dirname, 'build')));

app.get('/backend', function (req, res) {
  console.log("accessed backend")
  // res.set("Content-Security-Policy", "default-src 'self'");
  // res.sendFile(path.join(__dirname, '../build', './index.html'));
});

app.listen(PORT);
