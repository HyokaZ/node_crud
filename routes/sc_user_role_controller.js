const { response } = require('express')
const sc_user_role = require('../models/sc_user_role')
const router = require('express').Router()
const sequelize = require('../util/database')
const { QueryTypes, Sequelize } = require('sequelize')
const req = require('express/lib/request')

router.get('/', (req, res, next) => {
    sc_user_role.findAll().then(response => {
        res.status(200).json(response)
    }).catch(err => console.log(err))
})
router.post('/', (req, res, next) => {
    sc_user_role.create(req.body).then(result => {
        res.status(200).json(result)
    }).catch(err =>{
        console.log(err)
    })
})
router.put('/:id', (req, res, next) => {
    const id = req.params.id
    sc_user_role.findByPk(id).then(response => {
        if(!response){
            return res.status(400).json({messege: 'Data Not Found'})
        }
        response.user_id = req.body.user_id
        response.role_id = req.body.role_id
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
    sc_user_role.findByPk(id).then(response => {
        if(!response){
            return res.status(400).json({messege: 'Data Not Found'})
        }
        return sc_user_role.destroy({
            where:{
                user_role_id: id
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
    sc_user_role.findByPk(id).then(response => {
        if(!response){
            return res.status(400).json({messege: 'Data Not Found'})
        }
        res.status(200).json(response)
    }).catch(err =>{
        console.log(err)
    })
})


module.exports = router