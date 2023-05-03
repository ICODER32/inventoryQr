const mongoose = require('mongoose')

const connectDb = async () => {
    try {
        const db = await mongoose.connect('mongodb+srv://m001-student:Ibtisam@sandbox.xuwkkn8.mongodb.net/Inventory?retryWrites=true&w=majority');
        console.log('Database Connected')
        return db;
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

module.exports = connectDb
