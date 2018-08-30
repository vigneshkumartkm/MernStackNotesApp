const jwt = require('jsonwebtoken');
const _ = require('lodash')


const {
    mongoose
} = require('../db/mongoosedb.js') ;


const validator = require('validator');

const UserSchema = new mongoose.Schema ({

            userId: {
                type: String,
                required: true,
                minlength: 1,
                unique: true,
                 } ,
            password: {
                    type: String,
                    required: true,
                    minlength: 6
                }
                

            })



UserSchema.methods.toJSON = function () {
    
    let user = this;
    const userObject = user.toObject();
    let userId = _.pick(userObject, ['_id','userId'])
    
    return userId;
    

}

const User = mongoose.model('User', UserSchema ) 


        module.exports = {
            User
        }
