const mongoose = require('mongoose')
const config = require('config')
const db = config.get("mongoRemote")


const connectDB = async () => {
    console.log('before calling...')
    try {
        await mongoose.connect(db, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log("MongoDB Connected...")
    } catch (err) {
        console.log(err.message)

        process.exit(1)
    }
    console.log('after try...')
}


module.exports = connectDB