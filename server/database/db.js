import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const USERNAME = process.env.DB_USERNAME;
const PASSSWORD = process.env.DB_PASSWORD;

const DBConnection = async () => {
    const MONGODB_URI = `mongodb://${USERNAME}:${PASSSWORD}@ac-gbktlu5-shard-00-00.r4mtdxb.mongodb.net:27017,ac-gbktlu5-shard-00-01.r4mtdxb.mongodb.net:27017,ac-gbktlu5-shard-00-02.r4mtdxb.mongodb.net:27017/?ssl=true&replicaSet=atlas-qyxt61-shard-0&authSource=admin&retryWrites=true&w=majority`;
    try {
        await mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Error while connecting with database', error.message);
    }
}

export default DBConnection;