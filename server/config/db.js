const mongoose = require('mongoose')

require('dotenv').config()


const DBURL = process.env.DBURL

const ConnectDB = async () => {
    try {
        await mongoose.connect(DBURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("mongodb connected")
    } catch (error) {
        console.error("mongodb cannot connect")
        process.exit(1)
    }
}


module.exports = ConnectDB