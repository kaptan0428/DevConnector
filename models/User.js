const mongoos = require('mongoose'); 


// Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
const UserSchema = new mongoos.Schema({
    name: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true, 
        unique: true
    }, 
    password: {
        type: String, 
        required: true
    }, 
    avatar: {
        type: String
    }, 
    date: {
        type: Date, 
        default: Date.now
    }
}); 

// The mongoose.model() function of the mongoose module is used to create a collection of a particular database of MongoDB.
// so Creating collection
module.exports = User = mongoos.model('User', UserSchema); 