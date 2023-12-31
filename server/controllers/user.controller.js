/*
Specify the definition of the controller methods that are used in the
user.routes.js. These methods are callbacks to be executed when a route request 
is received by the server.
*/

import Product from '../models/user.model.js'
import extend from 'lodash/extend.js'
import errorHandler from './error.controller.js'
//Respond to the POST request at '/api/products' to create new product
//create function is 'async' so that await can be used to create a Promise object
//After the Promise object is resolved, the next line of code is executed
const create = async (req, res) => {
    const product = new Product(req.body)
    try {
        //Save user after Mongoose performed a validation check on the data
        await product.save()
        //Display sucessful message
        return res.status(200).json({
            message: "New product created succesffully!",
            data: product
        })
        //Catch any error
    } catch (err) {
        return res.status(400).json({
            error:errorHandler.getErrorMessage(err)
        })
    }
}


const list = async (req, res) => {
    try {
        let products = await Product.find().select('name description price quantity category')
        res.json(products)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const read = (req, res) => {
    return res.json(req.profile)
}



const update = async (req, res) => {
    try {
        let product = req.profile
        //lodash extend module is used to merge the changes that came in the request body
        product = extend(product, req.body)
        
        await product.save()
        res.json(product)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const removeProductByID = async (req, res) => {
    try {
        let product = req.profile
        let deleteProduct = await product.deleteOne({_id:req.params.userId}) 
        return res.status(200).json({
            message: "Product deleted!",
            data: deleteProduct
        })
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const removeAll = async (req, res) => {
    try {
        
        let deleteProducts = await Product.deleteMany({})
        return res.status(200).json({
            message: "Product deleted!",
            data: deleteProducts
        })
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const productByID = async (req, res, next, id) => {
    try {
        let product = await Product.findById(id)
        if (!product)
        return res.status('400').json({
        error:"Product not found"})
        req.profile = product
        next()
    } catch (err) {
        return res.status('400').json({
            error:"Could not retrieve product"
        })
    }
}

const getProductByParams = async (req, res) => {
    try {const name = req.query.name 
    const query = new RegExp(name, 'i');
    let products = await Product.find({name: query})
   
    res.status(200).json({
        success: true,
        data: products
    })} catch (err) {
        return res.status('400').json({
            error:"Could not retrieve product"
        })
    }
}


export default {create, list, read, update, removeAll, removeProductByID, productByID, getProductByParams}