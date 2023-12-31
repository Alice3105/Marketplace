import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import Template from './../template.js'
import userRoutes from './routes/user.routes.js'

const app = express()


app.get('/', (req, res) => {
    res.status(200).send(Template()) 
    })

/*//Set up an Express route for handling HTTP GET requests to the root ("/")
//When a GET HTTP request is made to "/", a callback function sends a JSON response
app.get('/', (req, res) => {
    res.json({ message: "Welcome to DressDeck Application!" });
});*/
    
app.use(express.json())
app.use(express.urlencoded({extended: true }))
app.use('/', userRoutes)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())

export default app
