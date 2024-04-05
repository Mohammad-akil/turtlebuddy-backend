import mongoose from 'mongoose';
import config from './config.js';
const connectDB = async () => {
    try {
        await mongoose.connect(config.database.local_uri)
        console.log(`mongoDB connect`)
    } catch (error) {
        console.log(`mongoDB connect error : `, error)
    }
}


export default connectDB 