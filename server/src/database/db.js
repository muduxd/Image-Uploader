const mongoose = require("mongoose")

const connectDatabase = () => {
    mongoose.connect(process.env.DB_CONNECTION, {
        useNewUrlParser: true
    })
}

module.exports = connectDatabase