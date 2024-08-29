const Sequelize = require('sequelize')
const db = require('../util/database')

const sc_user_role = db.define("sc_user_roles",{
    user_role_id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    user_id: Sequelize.BIGINT,
    role_id: Sequelize.BIGINT,
    create_by:Sequelize.STRING,
    update_by: Sequelize.STRING,
},{
    timestamps: true,
    createdAt: "create_date",
    updatedAt: "update_date",
})

module.exports = sc_user_role