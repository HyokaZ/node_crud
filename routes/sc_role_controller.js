const { response } = require('express')
const sc_role = require('../models/sc_role')
const router = require('express').Router()
const sequelize = require('../util/database')
const { QueryTypes, Sequelize, Model } = require('sequelize')
const req = require('express/lib/request')

router.get('/', (req, res, next) => {
    sc_role.findAll().then(response => {
        res.status(200).json(response)
    }).catch(err => console.log(err))
})
router.post('/', (req, res, next) => {
    sc_role.create(req.body).then(result => {
        res.status(200).json(result)
    }).catch(err =>{
        console.log(err)
    })
})
router.put('/:id', (req, res, next) => {
    const id = req.params.id
    sc_role.findByPk(id).then(response => {
        if(!response){
            return res.status(400).json({messege: 'Data Not Found'})
        }
        response.role_code = req.body.role_code
        response.role_name = req.body.role_name
        response.inactive = req.body.inactive
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
    sc_role.findByPk(id).then(response => {
        if(!response){
            return res.status(400).json({messege: 'Data Not Found'})
        }
        return sc_role.destroy({
            where:{
                role_id: id
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
    sc_role.findByPk(id).then(response => {
        if(!response){
            return res.status(400).json({messege: 'Data Not Found'})
        }
        res.status(200).json(response)
    }).catch(err =>{
        console.log(err)
    })
})




module.exports = router