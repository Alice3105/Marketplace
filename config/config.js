//tTis code sets up a configuration object (config) that stores various application settings.
//It checks for the presence of specific environment variables and provides default values 
//for these settings if the environment variables are not set. 
//This configuration object can be imported and used throughout the application to 
//access these settings.

//Declare a variable name config
const config = {
    
    //Property env is assigned to "NODE_ENV" environment variable if exits
    //If not, env's default value is "development"
    //env is used to determine the environment in which the application is running
    env: process.env.NODE_ENV || 'development',
    //Set port's property to the environment PORT (env.PORT) if exits
    //If not, port's default value is "3000"
    //Specify the port on which the Node.js server should listen
    port: process.env.PORT || 3000,
    //Set the jwtSecret's property to the environment JWT_SECRET (env.JWT_SECRET) if exits
    //Default value of this property is "YOUR_secret_key"
    //This property is used as the secret key for JSON Web Token (JWT) in authentication
    jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key", 
    //Set the mongoUri based on the env.MONGODB_URI, env.MONGO_HOST
    //If MONGODB_URI is set then it is used directly
    //If not, it will check the MONGO_HOST
    //If not, it will construct a URI using default values
    //This value is used to specify the MongoDB database connection URL
    mongoUri: process.env.MONGODB_URI || 
    "mongodb+srv://alicehuynh3105:ibv6rcsqg6QM7xsw@comp229404.2khzt8c.mongodb.net/marketplace?retryWrites=true&w=majority" ||
    process.env.MONGO_HOST ||
    'mongodb://' + (process.env.IP || 'localhost') + ':' + 
    (process.env.MONGO_PORT || '27017') +
    '/Marketplace'
}

//Export the config object as a default export of the module
export default config
   