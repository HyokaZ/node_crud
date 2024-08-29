const Sequelize = require('sequelize')
const db = require('../util/database')

const sc_role_detail = db.define("sc_role_details",{
    role_detail_id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    role_id: Sequelize.BIGINT,
    menu_id: Sequelize.BIGINT,
    query: Sequelize.BOOLEAN,
    insert:Sequelize.BOOLEAN,
    update:Sequelize.BOOLEAN,
    delete: Sequelize.BOOLEAN,
    create_by:Sequelize.STRING,
    update_by: Sequelize.STRING,
},{
    timestamps: true,
    createdAt: "create_date",
    updatedAt: "update_date",
})

module.exports = sc_role_detail