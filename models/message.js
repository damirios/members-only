const mongoose = require('mongoose');

const { Schema } = mongoose;

const MessageSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref:"User", required: true},
    timestamp: {type: String, required: true},
    title: {type: String, required: true, maxLength: 32},
    text: {type: String, required: true, maxLength: 500}
});

// Экспортирую модель
module.exports = mongoose.model('Message', MessageSchema);