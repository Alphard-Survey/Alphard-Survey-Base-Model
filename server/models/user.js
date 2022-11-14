/*
Members (Name - Student ID)
David Pietrocola –301247544 
Jacob Todasco – 301251200 
Jungyu Lee – 301236221 
Menal Humeda – 301160220 
Ryan Arafeh – 301239052 
Zack Havers – 301202845 
*/

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