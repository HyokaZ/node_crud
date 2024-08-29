const express = require('express')
const bodyparser = require('body-parser')
const sequelize = require('./util/database')
const cors = require('cors')

const app = express()
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:false}))
app.use(cors({
    origin:'*',
    credentials:true,
    methods:'POST, GET, PUT, DELETE'
}))

//ดัก error เมื่อ node ทำงานผิดพลาด
app.use((err, req, res, next) => {//js es6 callback
    console.log(err)
    const status = err.statusCode || 500
    const message = err.message
    res.status(status).json({message: message})
})

sequelize.sync().then(result => {
    console.log("Database Connected")
    app.listen(3000)
}).catch(err => console.log(err))

app.use('/sc_user', require('./routes/sc_user_controller'))
app.use('/sc_role', require('./routes/sc_role_controller'))
app.use('/sc_user_role', require('./routes/sc_user_role_controller'))
app.use('/sc_role_detail', require('./routes/sc_role_datail_controller'))