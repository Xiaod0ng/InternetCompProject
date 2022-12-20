const express = require('express')

const app = express()

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static(process.cwd() + '/final-front/dist'));


app.use((request, response, next) => { // listener 
    console.log('request received');
    next()
})

// connect to mysql
const connection = require("./dbconfig/db.js")

// user log in
app.post('/api/userLogin', (request, response) => { // get request

    console.log(request.body) // query: { name: 'dqwd', password: 'qdwd' },
    var requestBody = request.body;

    var loginSql = "select * from user where userName = ?";

    connection.query(loginSql, [requestBody.name], function (err, result) {
        if (result && result.length > 0) {
            if (result[0].userPassword == requestBody.password) {
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
        //connection.end();

    });

})

// user sign up
app.post('/api/userSignup', (request, response) => { // post request

    //connection.getConnection();

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
            //connection.getConnection();
            connection.query(signupSql, [requestBody.name, requestBody.password], function (err2, result2) {
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
            //connection.end()
        }
    })

    //connection.end();

})

// todoList add item
app.post('/api/todoAdd', (request, response) => { // post request

    //connection.getConnection();

    console.log(request.body) // query: { name: 'dqwd', password: 'qdwd' },
    var requestBody = request.body;

    var addTodoSql = "insert into todo (date, content, userId, status) values (?, ?, ?, ?)"

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
    //connection.end();

})

// todoList get todo list by date
app.post('/api/getTodoList', (request, response) => { // post request

    //connection.getConnection();

    console.log(request.body) // query: { name: 'dqwd', password: 'qdwd' },
    var requestBody = request.body;

    var getTodoListSql = "select * from todo where date = ? and userId = ?"

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
                msg: 'Get todoList successfully',
                data: {
                    todoList: result,
                    msg: 'Get todoList successfully'
                }
            })
        }
    })
    //connection.end();

})

// todoList delete item
app.post('/api/todoDelete', (request, response) => { // post request

    //connection.getConnection();

    console.log(request.body) // query: { name: 'dqwd', password: 'qdwd' },
    var requestBody = request.body;

    var deleteTodoSql = "delete from todo where id = ? "

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
    //connection.end();

})

// todoList edit item
app.post('/api/todoEdit', (request, response) => { // post request

    //connection.getConnection();

    console.log(request.body) // query: { name: 'dqwd', password: 'qdwd' },
    var requestBody = request.body;

    var editTodoSql = "update todo set content = ?, status = ? where id = ?"

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
    //connection.end();

})

// add note
app.post('/api/noteAdd', (request, response) => { // post request

    //connection.getConnection();

    console.log(request.body)
    var requestBody = request.body;

    var addNoteSql = "insert into note (title, content, date, userId) values (?, ?, ?, ?)"

    connection.query(addNoteSql, [requestBody.title, requestBody.content, requestBody.date, requestBody.userId], function (err, result) {
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
                msg: 'Add note successfully',
                data: {
                    msg: 'Add note successfully'
                }
            })
        }
    })
    //connection.end();

})

// get note by date
app.post('/api/getNote', (request, response) => { // post request

    //connection.getConnection();

    console.log(request.body)
    var requestBody = request.body;

    var getNoteSql = "select * from note where date = ? and userId = ?"

    connection.query(getNoteSql, [requestBody.date, requestBody.userId], function (err, result) {
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
                msg: 'Get note successfully',
                data: {
                    noteList: result,
                    msg: 'Get note successfully'
                }
            })
        }
    })
    //connection.end();

})

// delete note
app.post('/api/noteDelete', (request, response) => { // post request

    //connection.getConnection();

    console.log(request.body)
    var requestBody = request.body;

    var deleteNoteSql = "delete from note where id = ? "

    connection.query(deleteNoteSql, [requestBody.id], function (err, result) {
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
                msg: 'Delete note successfully',
                data: {
                    msg: 'Delete note successfully'
                }
            })
        }
    })
    //connection.end();

})

// edit note
app.post('/api/noteEdit', (request, response) => { // post request

    //connection.getConnection();

    console.log(request.body)
    var requestBody = request.body;

    var editNoteSql = "update note set title = ?, content = ? where id = ?"

    connection.query(editNoteSql, [requestBody.title, requestBody.content, requestBody.id], function (err, result) {
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
                msg: 'Edit note successfully',
                data: {
                    msg: 'Edit note successfully'
                }
            })
        }
    })
    //connection.end();

})

app.get('/', (request, response) => {
    response.sendFile(process.cwd() + '/final-front/dist/index.html');
})

const PORT = 5000;
app.listen(PORT, (err) => {
    if (!err) console.log(`Server is running on port ${PORT}.`);
});