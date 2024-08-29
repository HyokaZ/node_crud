const Sequelize = require('sequelize')
const db = require('../util/database')

const sc_user = db.define("sc_users",{
    id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    email: Sequelize.STRING,
    type: Sequelize.STRING,
    inactive: Sequelize.BOOLEAN,
    create_by:Sequelize.STRING,
    update_by: Sequelize.STRING,
},{
    timestamps: true,
    createdAt: "create_date",
    updatedAt: "update_date",
})

module.exports = sc_user