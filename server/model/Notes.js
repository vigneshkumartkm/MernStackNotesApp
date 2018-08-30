
const {mongoose} = require('../db/mongoosedb.js')

var Notes = mongoose.model('Notes',

    {
        userId: {
                type: String,
                required: true,
                minlength: 1
                 } ,
        note: {
            type: String,
            minlength: 1,
            trim : true,
            required: true,
        }

    }

)


module.exports = {Notes};