const dotenv= require('dotenv').config()
const express = require ("express")
const cors = require('cors')
const connectToMongoDB = require('./db/connection')
const router = require('./route/route')
const app = express()

const corsOptions = {
    origin: 'http://example.com', // Specify the allowed origin(s), you can specify * for all 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify the allowed HTTP methods
    credentials: true, // Include credentials in the CORS request (e.g., cookies)
  };
  /*
  If you are sending a token for authentication purposes and want the server to recognize it, you typically need to set credentials: true
   in your CORS configuration
  */
  app.use(cors(corsOptions));
  app.use(express.json())
const port = process.env.Port

app.use(router)

connectToMongoDB().then(()=>{

    app.listen(port, ()=> console.log('listening at port '+port))
}).catch((err)=>console.log(err.message))