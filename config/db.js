const mongoos = require('mongoose'); 
const config = require('config'); 
const db = config.get('mongoURI'); 

const connectDB = async () => {
    try{
        await mongoos.connect(db, {
            useNewUrlParser: true // <-- no longer necessary " https://mongoosejs.com/docs/migrating_to_6.html#no-more-deprecation-warning-options"
        }); 

        console.log('MongoDB is connected...');

    } catch(err) {
        console.error(err.message);

        //Exit process with failure
        process.exit(1); 
    }
}

module.exports = connectDB; 
