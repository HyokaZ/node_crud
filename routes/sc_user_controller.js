const { response } = require('express')
const sc_user = require('../models/sc_user')
const router = require('express').Router()
const sequelize = require('../util/database')
const { QueryTypes, Sequelize } = require('sequelize')
const req = require('express/lib/request')

router.get('/', (req, res, next) => {
    sc_user.findAll().then(response => {
        res.status(200).json(response)
    }).catch(err => console.log(err))
})

router.post('/', (req, res, next) => {
    sc_user.create(req.body).then(result => {
        res.status(200).json(result)
    }).catch(err =>{
        console.log(err)
    })
})
router.put('/:id', (req, res, next) => {
    const id = req.params.id
    sc_user.findByPk(id).then(response => {
        if(!response){
            return res.status(400).json({messege: 'Data Not Found'})
        }
        response.email = req.body.email
        response.type = req.body.type
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
    sc_user.findByPk(id).then(response => {
        if(!response){
            return res.status(400).json({messege: 'Data Not Found'})
        }
        return sc_user.destroy({
            where:{
                id: id
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
    sc_user.findByPk(id).then(response => {
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
        SELECT id , email , role_id , role_name
        FROM sc_users u 
        LEFT JOIN sc_roles r ON r.role_id = u.id
        WHERE u.inactive = false AND r.inactive =false
        
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