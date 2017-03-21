'use strict';
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    first_name: {type: String},
    last_name: {type: String}
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'last_updated'
    }
});

module.exports = mongoose.model('User', userSchema);