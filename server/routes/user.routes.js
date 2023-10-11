import express from 'express'
import productCtrl from '../controllers/user.controller.js'

//User express.Router() to define route paths with relevant HTTP methods
//and assign thecorresponding controller function that is summoned when 
//these requests are received by the server
const router = express.Router()
//List all products
router.route('/api/product')
    .get(productCtrl.list)
    //Add new Product
    .post(productCtrl.create)
    //Remove all Products
    .delete(productCtrl.removeAll)
//Get Product by id
router.route('/api/product/:id')
    .get(productCtrl.read)
    //Update Product by id
    .put(productCtrl.update)
    //Remove Product by id
    .delete(productCtrl.removeProductByID)
    
//Find all Products which name contains "kw"
router.route('/api/products') 
    .get(productCtrl.getProductByParams)
    
    
router.param('id',productCtrl.productByID)
//router.param('kw', productCtrl.listByName)

export default router