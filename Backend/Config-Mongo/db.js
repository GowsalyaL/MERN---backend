const mongoose = require('mongoose')

MONGO_URI = "mongodb+srv://gowsalyanallasivam:Lovely@cluster0.erlnfxt.mongodb.net/Mern-project?retryWrites=true&w=majority"

const connectDb = async () =>{
    try {

        const connect = await mongoose.connect (MONGO_URI)
        console.log(`Mongo connection: ${connect.connection.host}`.cyan.underline  );
    } catch (error) {
        console.log(error);
        PerformanceObserverEntprocess.exit(1)
    }
}

module.exports = connectDb
