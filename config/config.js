// const config = {
// env: process.env.NODE_ENV || 'development',
// port: process.env.PORT || 3000,
// jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
// mongoUri: process.env.MONGODB_URI ||
// "mongodb+srv://adamepaolo:adamepaolo1998@cluster0.xyfnver.mongodb.net/JobTracker?retryWrites=true&w=majority&appName=Cluster0" ||
// process.env.MONGO_HOST ||
// 'mongodb://' + (process.env.IP || 'localhost') + ':' +
// (process.env.MONGO_PORT || '27017') +
// '/mernproject'
// }
// export default config
import dotenv from 'dotenv';
// Load environment variables from .env file immediately
dotenv.config(); 

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  
  // 1. JWT Secret: Use the environment variable if present, otherwise use a placeholder
  // It's highly recommended to define JWT_SECRET in your .env
  jwtSecret: process.env.JWT_SECRET || "A_DEFAULT_SECRET_THAT_SHOULD_BE_CHANGED",

  // 2. MongoDB URI: Remove the hardcoded key entirely.
  // The value will come from process.env.MongoDB_URI (your .env file).
  // If the variable isn't found, we use a simple fallback that will cause an error 
  // and clearly tell the developer what's missing.
  mongoUri: process.env.MongoDB_URI || 
            process.env.MONGODB_URI || 
            "MongoDB URI not set! Please define MongoDB_URI in your .env file."
}
export default config