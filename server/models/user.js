//Require Modules For The User Model
let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let User = mongoose.Schema
(
    {
        username: 
        {
            type: String,
            default: "",
            trim: true,
            required: "Username Is Required"
        },
        /*
        password:
        {
            type: String,
            default: "",
            trim: true,
            required: "Password Is Required"
        }
        */
       email:
       {
        type: String,
        default: "",
        trim: true,
        required: "Email Address Is Required"
       },
       displayName:
       {
        type: String,
        default: "",
        trim: true,
        required: "Display Name Is Required"
       },
       created:
       {
        type: Date,
        default: Date.now
       },
       update:
       {
        type: Date,
        default: Date.now
       }
    },
    {
        collection: "users"
    }
)

//Configue Options For User Model

let options = ({ missingPasswordError: 'Wrong / Missing Password'});

User.plugin(passportLocalMongoose, options);

module.exports.User = mongoose.model('User', User);