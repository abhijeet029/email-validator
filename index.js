const express = require('express')
const http = require('http')
const path = require('path')
const bodyParser = require('body-parser')
var axios = require("axios").default;
var app = express();
require('dotenv').config()

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

http.createServer(app).listen(3001, () =>{
  console.log('Express server listening on port 3001');
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/views/email-validator-form.html'))
})

app.post('/validate-email', async function(req, res) {
	let email = req.body.email;
	if (!email){
    return res.status(200).send({
    	success: false,
      msg: 'Please enter email id.'
    })
  }
 
  let isValid = false;
  checkEmail(email).then(resp => {
    isValid = resp.data.valid;
    if (isValid) return res.send({success: true, msg: 'Email Id is correct.'});
    else{
      return res.status(200).send({
        success: false,
        msg: 'Email id is not correct.',
      })
    }

  }).catch(function (error) {
    return res.status(200).send({
      success: false,
      msg: 'Email id is not correct.',
    })
  });
})

async function isEmailValid(email) {
 return emailVal.validate(email)
}

function checkEmail(email){
  let isValid = false;
  var options = {
    method: 'GET',
    url: 'https://ipqualityscore.com/api/json/email/'+process.env.ipQualityScoreAPIKey+'/'+email,
  };
  return axios.request(options)
}