const Sequelize = require('sequelize')
const db = require('../util/database')

const sc_role = db.define("sc_roles",{
    role_id :{
        type: Sequelize.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    role_code: Sequelize.STRING,
    role_name: Sequelize.STRING,
    inactive: Sequelize.BOOLEAN,
    create_by: Sequelize.STRING,
    update_by: Sequelize.STRING
},{
    timestamps: true,
    createdAt: "create_date",
    updatedAt: "update_date",
})

module.exports = sc_role