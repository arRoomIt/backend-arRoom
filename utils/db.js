const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/ArRoom";

const connect = async () => {
    try {
        const db = await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,

        });
        const { name, host } = db.connection;
        console.log(`Conectado con éxito a ${name} en ${host}`);

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    connect,
    DB_URL,
};