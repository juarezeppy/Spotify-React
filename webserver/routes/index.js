//------------------------------------------------------------------------------------------------
// Webserver index.js is responsible for all interactions with the Spotify Server (login,
// authorization, HTTP requests).
//------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------
// Requirements and variables
//------------------------------------------------------------------------------------------------
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const fs = require('fs');

let loadedFiles = false;

const redirect_uri = 'http://localhost:8888/callback';
const client_uri = 'http://localhost:3000';
const spotify_base_uri = 'https://api.spotify.com/v1';

//these values will be loaded from client_secret.json
let my_client_id = null;
let my_client_secret = null;

//these tokens will be stored in tokens.json
let access_token = null;
let refresh_token = null;

//------------------------------------------------------------------------------------------------
// Authorization functions
//------------------------------------------------------------------------------------------------
/*This function does not need to be edited.*/
function writeTokenFile(callback) {
  fs.writeFile(
    'tokens.json',
    JSON.stringify({ access_token: access_token, refresh_token: refresh_token }),
    callback
  );
}

/*This function does not need to be edited.*/
function readTokenAndClientSecretFiles(callback) {
  fs.readFile('client_secret.json', (err, data) => {
    data = JSON.parse(data);
    my_client_id = data.client_id;
    my_client_secret = data.client_secret;
    fs.readFile('tokens.json', (err, data) => {
      data = JSON.parse(data);
      access_token = data.access_token;
      refresh_token = data.refresh_token;
      callback();
    });
  });
}

//Refreshes access_tokens as needed by using the original refresh_token
function refresh(callback) {
  //builds refresh token uri
  const params = new URLSearchParams();
  params.append('grant_type', 'refresh_token');
  params.append('refresh_token', refresh_token);

  //requests new token and updates token in tokens.json
  fetch(`https://accounts.spotify.com/api/token?${params.toString()}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'Basic ' + Buffer.from(my_client_id + ':' + my_client_secret).toString('base64')
    }
  })
    .then(async (response) => {
      const body = await response.json();
      access_token = body.access_token;
      writeTokenFile(callback);
    })
    .catch((error) => console.log('refresh failed: ', error));
}

//Makes API requests to the Spotify Server and returns a response
async function makeAPIRequest(spotify_endpoint, res) {
  //checks if access_token is invalid and refreshes it
  refresh(() => {});

  //captures API request response
  const response = await fetch(spotify_endpoint, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + access_token
    }
  }).catch((error) => console.log('makeAPIRequest failed: ', error));

  const body = await response.json();
  console.log(body);
  res.send(body); //causes error when refresh is uncommented, probably a refresh problem
}

/*This function does not need to be edited.*/
router.get('*', function(req, res, next) {
  //Applies to all endpoints: load the token and client secret files if they haven't been loaded
  if (!loadedFiles) {
    readTokenAndClientSecretFiles(function() {
      loadedFiles = true;
      next();
    });
  } else {
    next();
  }
});

//Re-routes to the Spotify authentication page and prompts user for login info
router.get('/login', function(req, res, next) {
  var scopes = 'user-read-private user-read-email';

  //redirects user to Spotify login page
  res.redirect(
    'https://accounts.spotify.com/authorize' +
      '?response_type=code' +
      '&client_id=' +
      my_client_id +
      (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
      '&redirect_uri=' +
      encodeURIComponent(redirect_uri)
  );
});

//Exchanges a code for access and refresh_tokens for login process
router.get('/callback', function(req, res, next) {
  const code = req.query.code || null;

  //builds authorization url
  const params = new URLSearchParams();
  params.append('code', code);
  params.append('redirect_uri', redirect_uri);
  params.append('grant_type', 'authorization_code');

  //sends request to retrieve access and refresh tokens and writes them to file
  fetch(`https://accounts.spotify.com/api/token?${params.toString()}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'Basic ' + Buffer.from(my_client_id + ':' + my_client_secret).toString('base64')
    }
  })
    .then(async (response) => {
      const body = await response.json();
      access_token = body.access_token;
      refresh_token = body.refresh_token;
      writeTokenFile(next);
    })
    .catch((error) => console.log('callback failed: ', error));

  res.redirect(client_uri);
});

//------------------------------------------------------------------------------------------------
// API endpoints/queries
//------------------------------------------------------------------------------------------------
/*This function does not need to be edited.*/
router.get('/', function(req, res, next) {
  res.redirect(client_uri); //redirects to the client at localhost:3000
});

/*This function does not need to be edited.*/
router.get('/me', function(req, res, next) {
  makeAPIRequest(spotify_base_uri + '/me', res);
});

/*This function does not need to be edited.*/
router.get('/search/:category/:resource', function(req, res, next) {
  var resource = req.params.resource;
  var category = req.params.category;
  var params = new URLSearchParams();
  params.append('q', resource);
  params.append('type', category);
  makeAPIRequest(spotify_base_uri + '/search?' + params, res);
});

/*This function does not need to be edited.*/
router.get('/artist/:id', function(req, res, next) {
  var id = req.params.id;
  makeAPIRequest(spotify_base_uri + '/artists/' + id, res);
});

/*This function does not need to be edited.*/
router.get('/artist-related-artists/:id', function(req, res, next) {
  var id = req.params.id;
  makeAPIRequest(spotify_base_uri + '/artists/' + id + '/related-artists', res);
});

/*This function does not need to be edited.*/
router.get('/artist-albums/:id', function(req, res, next) {
  var id = req.params.id;
  makeAPIRequest(spotify_base_uri + '/artists/' + id + '/albums', res);
});

/*This function does not need to be edited.*/
router.get('/artist-top-tracks/:id', function(req, res, next) {
  var id = req.params.id;
  makeAPIRequest(spotify_base_uri + '/artists/' + id + '/top-tracks?country=US', res);
});

/*This function does not need to be edited.*/
router.get('/album/:id', function(req, res, next) {
  var id = req.params.id;
  makeAPIRequest(spotify_base_uri + '/albums/' + id, res);
});

/*This function does not need to be edited.*/
router.get('/album-tracks/:id', function(req, res, next) {
  var id = req.params.id;
  makeAPIRequest(spotify_base_uri + '/albums/' + id + '/tracks', res);
});

/*This function does not need to be edited.*/
router.get('/track/:id', function(req, res, next) {
  var id = req.params.id;
  makeAPIRequest(spotify_base_uri + '/tracks/' + id, res);
});

/*This function does not need to be edited.*/
router.get('/track-audio-features/:id', function(req, res, next) {
  var id = req.params.id;
  makeAPIRequest(spotify_base_uri + '/audio-features/' + id, res);
});

module.exports = router;
