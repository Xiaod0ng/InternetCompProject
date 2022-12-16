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


// user log in
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

    var loginSql = "select * from user where userName = ?";

    connection.query(loginSql, [requestQuery.name], function (err, result) {
        if (result && result.length > 0) {
            if (result[0].userPassword == requestQuery.password) {
                response.send({
                    code: 0,
                    msg: 'Login success',
                    data: {
                        userInfo: {
                            userId: result[0].userId,
                            userName: result[0].userName,
                        },
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

// user sign up
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

    connection.query(checkSql, [requestBody.name], function (err, result) {
        if (err) {
            console.log(err)
            response.send({
                code: 0,
                msg: 'sql error',
                data: {}
            })
        } else if (result && result.length > 0) {
            response.send({
                code: 0,
                msg: 'User already exists',
                data: {
                    msg: 'User already exists'
                }
            })
        } else {
            var connection2 = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: 'Wuqy22878899',
                database: 'ic_final_project'
            });

            connection2.connect();
            connection2.query(signupSql, [requestBody.name, requestBody.password], function (err2, result2) {
                if (err2) {
                    console.log(err2)
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
            connection2.end()
        }
    })

    connection.end();

})

// todoList add item
app.post('/api/todoAdd', (request, response) => { // post request
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


    var addTodoSql = "insert into todoList (date, content, userId, status) values (?, ?, ?, ?)"

    connection.query(addTodoSql, [requestBody.date, requestBody.content, requestBody.userId, requestBody.status], function (err, result) {
        if (err) {
            console.log(err)
            response.send({
                code: 0,
                msg: 'sql error',
                data: {}
            })
        } else {
            response.send({
                code: 0,
                msg: 'Add success',
                data: {
                    msg: 'Add success'
                }
            })
        }
    })
    connection.end();

})

// todoList get todo list by date
app.post('/api/getTodoList', (request, response) => { // post request
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


    var getTodoListSql = "select * from todoList where date = ? and userId = ?"

    connection.query(getTodoListSql, [requestBody.date, requestBody.userId], function (err, result) {
        if (err) {
            console.log(err)
            response.send({
                code: 0,
                msg: 'sql error',
                data: {}
            })
        } else {
            response.send({
                code: 0,
                msg: 'Get todoList successful',
                data: {
                    todoList: result,
                    msg: 'Get todoList successful'
                }
            })
        }
    })
    connection.end();

})

// todoList delete item
app.post('/api/todoDelete', (request, response) => { // post request
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


    var deleteTodoSql = "delete from todoList where id = ? "

    connection.query(deleteTodoSql, [requestBody.id], function (err, result) {
        if (err) {
            console.log(err)
            response.send({
                code: 0,
                msg: 'sql error',
                data: {}
            })
        } else {
            response.send({
                code: 0,
                msg: 'Delete success',
                data: {
                    msg: 'Delete success'
                }
            })
        }
    })
    connection.end();

})

// todoList edit item
app.post('/api/todoEdit', (request, response) => { // post request
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


    var editTodoSql = "update todoList set content = ?, status = ? where id = ?"

    connection.query(editTodoSql, [requestBody.content, requestBody.status, requestBody.id], function (err, result) {
        if (err) {
            console.log(err)
            response.send({
                code: 0,
                msg: 'sql error',
                data: {}
            })
        } else {
            response.send({
                code: 0,
                msg: 'Edit success',
                data: {
                    msg: 'Edit success'
                }
            })
        }
    })
    connection.end();

})

app.listen(5000, (err) => {
    if (!err) console.log('satrt server');
}) 