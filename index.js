const express = require('express');

let app = require('express')();
let http = require('http').Server(app);
let bodyParser = require('body-parser');

let port = process.env.PORT || 3000;
let sanitizer = require('sanitizer');
let request = require('request');
let rp = require('request-promise');

let Algebrite = require('algebrite');

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

app.post('/scrape', function (req, res) {
  const url = req.body.url;
  console.log("Scraping " + url);

  rp (url)
  .then(function (html) {
    res.send(sanitizer.escape(html));
  })
  .catch(function (error) {
    res.send(error);
  });
});

app.post('/unsafescrape', function (req, res) {
  const url = req.body.url;
  console.log("Scraping " + url);

  rp (url)
  .then(function (html) {
    res.send(html);
  })
  .catch(function (error) {
    res.send(error);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});