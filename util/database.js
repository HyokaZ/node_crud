const Sequelize = require('sequelize')

const sequelize = new Sequelize(
    "db_test", //database
    "postgres", //user
    "123456", //password
    {
        host:"localhost",
        post:"5432",
        dialect:"postgres",
    }
)

module.exports = sequelize