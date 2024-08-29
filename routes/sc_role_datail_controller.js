const { response } = require('express')
const sc_role_detail = require('../models/sc_role_detail')
const router = require('express').Router()
const sequelize = require('../util/database')
const { QueryTypes, Sequelize, Model } = require('sequelize')
const req = require('express/lib/request')

router.get('/', (req, res, next) => {
    sc_role_detail.findAll().then(response => {
        res.status(200).json(response)
    }).catch(err => console.log(err))
})
router.post('/', (req, res, next) => {
    sc_role_detail.create(req.body).then(result => {
        res.status(200).json(result)
    }).catch(err =>{
        console.log(err)
    })
})
router.put('/:id', (req, res, next) => {
    const id = req.params.id
    sc_role_detail.findByPk(id).then(response => {
        if(!response){
            return res.status(400).json({messege: 'Data Not Found'})
        }
        response.role_id = req.body.role_id
        response.menu_id = req.body.menu_id
        response.query = req.body.query
        response.insert = req.body.insert
        response.update = req.body.update
        response.delete = req.body.delete
        response.create_by = req.body.create_by
        response.update_by = req.body.update_by
        return response.save()
    }).then(result =>{
        res.status(200).json(result)
    })
    .catch(err =>{
        console.log(err)
    })
})
router.delete('/:id', (req, res, next) => {
    const id = req.params.id
    sc_role_detail.findByPk(id).then(response => {
        if(!response){
            return res.status(400).json({messege: 'Data Not Found'})
        }
        return sc_role_detail.destroy({
            where:{
                role_detail_id: id
            }
        })
    }).then(result =>{
        res.status(200).json(result)
    })
    .catch(err =>{
        console.log(err)
    })
})
router.get('/getById/:id', (req, res, next) => {
    const id = req.params.id
    sc_role_detail.findByPk(id).then(response => {
        if(!response){
            return res.status(400).json({messege: 'Data Not Found'})
        }
        res.status(200).json(response)
    }).catch(err =>{
        console.log(err)
    })
})
router.get('/selectAll',async (req, res, next) => {
    const data = await sequelize.query(
        `
        SELECT r.role_id , r.role_name , d.menu_id , d.query, d.insert , d.update , d.delete
        FROM sc_roles r
        LEFT JOIN sc_role_details d ON r.role_id = r.role_id
        WHERE r.inactive =false AND r.role_id =1 
        
        `,
        {
            // replacement: { test: req.params.id}, WHERE id = test
            type: QueryTypes.SELECT
        }
    )
    if(data.lenghth ===0 ){
        return res.status(400).json({messege: "Data Not Found"})
    }else{
        return res.status(200).json(data)
    }
})


module.exports = router