const express = require('express')
var bodyParser = require('body-parser');

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use((request, response, next) => { // listener 
    console.log('request received');
    next()
})

app.get('/api/userLogin', (request, response) => { // get request
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Wuqy22878899',
        database: 'ic_final_project'
    });

    connection.connect();

    console.log(request.query) // query: { name: 'dqwd', password: 'qdwd' },
    var requestQuery = request.query;

    var loginSql = "select userPassword from user where userName = ?";

    connection.query(loginSql, [requestQuery.name], function (err, result) {
        if (result && result.length > 0) {
            if (result[0].userPassword == requestQuery.password) {
                response.send({
                    code: 0,
                    msg: 'Login success',
                    data: {
                        msg: 'Login success'
                    }
                })
            }
        } else {
            response.send({
                code: 0,
                msg: 'Please input correct user name or password',
                data: {
                    msg: 'Please input correct user name or password'
                }
            })
        }
        connection.end();

    });

})

app.post('/api/userSignup', (request, response) => { // post request
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Wuqy22878899',
        database: 'ic_final_project'
    });

    connection.connect();

    console.log(request.body) // query: { name: 'dqwd', password: 'qdwd' },
    var requestBody = request.body;

    // check if userName exists
    var checkSql = "select userPassword from user where userName = ?"
    var signupSql = "insert into user (userName, userPassword) values (?,?)";
    var userExist = false

    connection.query(checkSql, [requestBody.name], function (err, result) {
        if (err) {
            response.send({
                code: 0,
                msg: 'sql error',
                data: {}
            })
            userExist = null;
        } else if (result && result.length > 0) {
            response.send({
                code: 0,
                msg: 'User already exists',
                data: {
                    msg: 'User already exists'
                }
            })
            userExist = true;
        }
    })
    if (userExist === false) {
        connection.query(signupSql, [requestBody.name, requestBody.password], function (err, result) {
            if (err) {
                response.send({
                    code: 0,
                    msg: 'sql error',
                    data: {}
                })
            } else {
                response.send({
                    code: 0,
                    msg: 'Create an account successfully',
                    data: {
                        msg: 'Create an account successfully'
                    }
                })
            }
        });
    }

    connection.end();

})


app.listen(5000, (err) => {
    if (!err) console.log('satrt server');
}) 