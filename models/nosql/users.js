const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String
        },
        age: {
            type: String
        },
        email: {
            type: String,
            unique: true
        },
        password: {
            type: String,
            select: false
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        }

    },
    {
        timestamp: true,
        versionKey: false
    }
)

UserSchema.plugin(mongooseDelete, {overrideMethods: 'all'})
module.exports = mongoose.model('users', UserSchema)