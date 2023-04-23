const mongoose = require('mongoose')

const connectDb = async () =>{
    try {

        const connect = await mongoose.connect (process.env.MONGO_URI)
        console.log(`Mongo connection: ${connect.connection.host}`.cyan.underline  );
    } catch (error) {
        console.log(error);
        PerformanceObserverEntprocess.exit(1)
    }
}

module.exports = connectDb