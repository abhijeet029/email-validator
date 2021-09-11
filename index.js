const express = require('express')
const emailVal = require('deep-email-validator')
const http = require('http')
const path = require('path')
const bodyParser = require('body-parser')
var app = express();

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
 
  const {valid, reason, validators} = await isEmailValid(email);
 
  if (valid) return res.send({success: true, msg: 'Email Id is correct.'});
 
  return res.status(200).send({
  	success: false,
    msg: validators[reason].reason,
  })
})

async function isEmailValid(email) {
 return emailVal.validate(email)
}