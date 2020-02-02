const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

const bcrypt = require('bcrypt');
const saltRounds = 10;
const mockPassword = 'superSecret';
var mockPasswordHash='';
bcrypt.hash(mockPassword, saltRounds, function(err, hash) {
    // Store hash in your password DB.
    mockPasswordHash = hash;
  });

const mockUserData=[
    {name:'Mark'},
    {name:'Jill'}
    ]

app.post('/login',function(req,res){
    const username=req.body.username;
    const password=req.body.password;

    const mockUsername="billyTheKid";
    var isOk = false;
    if (username===mockUsername){
        bcrypt.compare(password, mockPasswordHash, function(err, result) {
            isOk = result;
            if (isOk){
                res.json({
                    success: true,
                    message: 'password and username match!',
                    token: 'encrypted token goes here'
                })
            } else {
                    res.json({
                        success: false,
                        message: 'password and username do not match'
                    })
            }
        });
    }
})

app.get('/users', function(req,res){
    res.json({
        success: true,
        message: 'successfully got users. Nice!',
        users: mockUserData
    })
})

app.get('/users/:id',function(req,res){
	console.log(req.params.id)
	res.json({
		success: true,
		message: 'got one user',
		user: req.params.id
	})
})

app.listen(8000,function(){
    console.log("server is running")
})