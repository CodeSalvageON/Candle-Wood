const express = require('express');

let app = require('express')();
let http = require('http').Server(app);
let bodyParser = require('body-parser');

let port = process.env.PORT || 3000;
let sanitizer = require('sanitizer');

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('', function (req, res) {
  const index = __dirname + '/public/static/index.html';

  res.sendFile(index);
});

let net_get = "";

app.post('/net', function (req, res) {
  const user = req.body.user;
  const msg = req.body.msg;

  let clean_user = sanitizer.escape(user);
  const clean_msg = sanitizer.escape(msg);

  if (clean_user === null || clean_user === "" || clean_user === undefined) {
    clean_user = "Anonymous";
  }

  net_get = clean_user + ": " + clean_msg;
  res.send("set net get!");
});

app.get('/net', function (req, res) {
  res.send(net_get);
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});